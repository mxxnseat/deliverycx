import { Request, Response } from "express";
import mongoose from "mongoose";
import * as model from "../db/models";
import { User } from "../db/models";
import { ICity } from "../db/models/api/City";


class Api {
    public async getCities(req: Request, res: Response) {
        try {
            const cities = await model.City.find({});

            res.json(cities);
        } catch (e: unknown) {
            console.log(e);
        }
    }

    public async getAddresses(req: Request, res: Response) {
        const city = req.query.city;
        if (!city) {
            return res.status(400).json("Bad request");
        }
        try {
            const organizations = await model.Organization.find({ city: city as object }).populate("city");

            res.json(organizations);
        } catch (e: unknown) {
            console.log(e);
        }
    }

    public async getCategories(req: Request, res: Response) {
        try {
            const groups = await model.Group.find({}).sort({ order: 1 });

            res.json(groups);
        } catch (e: unknown) {
            console.log(e);
        }
    }

    public async getProducts(req: Request, res: Response) {
        try {
            const category = req.query.category as string;
            const organization = req.query.organization as string;
            const queryString = req.query.searchQuery as string;
            const username = req.body.username;

            if (!organization) {
                throw Error();
            }

            const user = await User.findOne({ username });
            let matchQuery = {}
            if (!category) {
                matchQuery = {
                    'products.name': {
                        $regex: queryString ? queryString : '',
                        $options: "i"
                    }
                }
            } else {
                if(category !== "favorite"){
                  matchQuery = {
                    'products.group': category ? category : ''
                  }
                }
            }
            const aggregatePipeline: any = [
              {
                $match: {
                  organization
                }
              },
              {
                $unwind: "$products"
              },
              {
                $match: matchQuery
              },
              {
                $lookup: {
                  from: "favorites",
                  let: {
                    favId: "$products"
                  },
                  pipeline: [
                    {
                      $match: {
                        user: user._id
                      }
                    },
                    {
                      $project: {
                        products: {
                          $setIntersection: [
                            "$$ROOT.products",
                            "$products"
                          ]
                        }
                      }
                    }
                  ],
                  as: "fav"
                }
              },
              {
                $addFields: {
                  "firstFromFav": {
                    $first: "$fav.products"
                  }
                }
              },
              {
                $addFields: {
                  "products.isFav": {
                    $cond: [
                      {
                        $in: [
                          "$products.id",
                          "$firstFromFav.id",
                          
                        ]
                      },
                      true,
                      false
                    ]
                  }
                }
              },
              {
                $set: {
                  "fav": "$$REMOVE"
                }
              },
              {
                $group: {
                  _id: null,
                  products: {
                    $push: "$$ROOT.products"
                  }
                }
              }
            ]

            if(category === "favorite"){
              aggregatePipeline.push({
                $project: {
                  products: {
                    $filter: {
                      input: "$products",
                      as: "product",
                      cond: {
                        $eq: [
                          "$$product.isFav",
                          true
                        ]
                      }
                    }
                  }
                }
              })
            }

            const products = await model.Product.aggregate(aggregatePipeline)
            res.status(200).json(products[0] ? products[0].products : []);
        } catch (e: unknown) {
            console.log(e);
            res.status(400).json("Bad request");
        }
    }

    public async getProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const organization = req.query.organization;
            let product: any = await model.Product.aggregate([
                { $unwind: "$products" },
                { $match: { "products.id": id, organization } },
                {
                    $project: {
                        _id: 0,
                        organization: 0
                    }
                },
                {
                    $group: {
                        _id: null,
                        products: { $addToSet: "$products" }
                    }
                },
            ])
            if (!product) {
                throw Error();
            }
            product = product.map((p: any) => new model.Product(p));
            product = await model.Product.populate(product, { path: "products.group" });
            product = product[0].products[0];

            let sauces = null;
            if (!product.code.match(/^SO-\d+$/)) {
                sauces = await model.Product.aggregate([
                    { $unwind: "$products" },
                    { $match: { organization, "products.code": { $regex: /^SO-\d+$/ } } },
                    { $project: { organization: 0, revision: 0, _id: 0 } },
                    {
                        $group: {
                            _id: null,
                            sauces: { $addToSet: "$products" }
                        }
                    }
                ]);
                if (sauces.length) {
                    sauces = sauces[0].sauces;
                }
            }

            res.json({
                sauces,
                product
            });
        } catch (e: unknown) {
            console.log(e);
            return res.status(404).json("Not found");

        }
    }
}

export default Api;