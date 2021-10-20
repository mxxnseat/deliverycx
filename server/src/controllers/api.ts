import { Request, Response } from "express";
import mongoose from "mongoose";
import * as model from "../db/models";
import { User } from "../db/models";
import { ICity } from "../db/models/api/City";
import {IProduct, IStopListItem} from "../types/axiosResponses";
import iiko from "../services/iiko";


class Api {
    public async getCities(req: Request, res: Response) {
        try {
            const name = req.query.city as string;
            const cities = await model.City.find({name: {$regex: name, $options: 'i'}});

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
            const {username} = req.body;
            const user = await User.findOne({ username});
            const groups = await model.Group.find({organization: user.organization}).sort({ order: 1 });



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

            const products = await model.Product.aggregate(aggregatePipeline);
            // const stopList = await iiko.iikoMethodBuilder(()=>iiko.getStopLists(organization));

            // const filterProductsByStopList = products[0] ? products[0].products.filter((product: IProduct)=>{
            //   return stopList[0] ? !stopList[0].find(
            //     (stopListProduct: IStopListItem)=>stopListProduct.productId === product.id && stopListProduct.balance === 0
            //     ) : product;
            // }) : [];

            const productsList = products[0] ? products[0].products : [];
            setTimeout(()=>{
              res.status(200).json(productsList);
            }, 1500);
        } catch (e: unknown) {
            console.log(e);
            res.status(400).json("Bad request");
        }
    }

    public async getProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {username } = req.body;

            const user = await User.findOne({ username });

            if(!user){
              throw Error();
            }
            const organization = user.organization;

            const stopList = await iiko.iikoMethodBuilder(()=>iiko.getStopLists(organization));
            let product: any = await model.Product.aggregate([
              {
                $match: {
                  "organization": organization,
                }
              },
              {
                $unwind: "$products"
              },
              {
                $match: {
                  "products.id": id
                }
              },
              {
                $lookup: {
                  "from": "favorites",
                  pipeline: [
                    {
                      $match: {
                        "user": user._id
                      }
                    },
                    {
                      $unwind: "$products"
                    },
                    {
                      $group: {
                        _id: null,
                        products: {
                          $addToSet: "$products.id"
                        }
                      }
                    },
                    {
                      $unset: "_id"
                    }
                  ],
                  as: "fav"
                }
              },
              {
                $addFields: {
                  "firstFromFav": {
                    $cond: [
                      {
                        $eq: [
                          {
                            $size: "$fav"
                          },
                          0
                        ]
                      },
                      [],
                      {
                        $first: "$fav"
                      }
                    ]
                  }
                }
              },
              {
                "$addFields": {
                  "products.isFav": {
                    $cond: [
                      {
                        $in: [
                          "$$ROOT.products.id",
                          "$firstFromFav.products"
                        ]
                      },
                      true,
                      false
                    ]
                  },
                }
              },
              {
                $project:{
                  products: 1
                }
              }
            ]);
            const isFindProduct = stopList[0].find(
                (stopListEl:IStopListItem)=>stopListEl.productId === product[0].products.id && stopListEl.balance === 0
              );
            product = isFindProduct ? null : product[0].products;
            if (!product) {
                throw Error();
            }
            const group = await model.Group.findOne({_id: product.group});
        
            let sauces = null;
            if (!product.code.match(/^SO-\d+$/)) {
                sauces = await model.Product.aggregate([
                    { $unwind: "$products" },
                    { $match: { organization: user.organization, "products.code": { $regex: /^SO-\d+$/ } } },
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
                group,
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