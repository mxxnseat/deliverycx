import { Request, Response } from "express";
import mongoose from "mongoose";
import * as model from "../db/models";
import { ICity } from "../db/models/api/City";


class Api {
    public async getCities(req: Request, res: Response) {
        try {
            const cities: ICity = await model.City.find({});

            res.json(cities);
        } catch (e: unknown) {
            console.log(e);
        }
    }

    public async getAddresses(req: Request, res: Response) {
        const cityId = req.query.cityId;
        if (!cityId) {
            return res.status(400).json("Bad request");
        }
        try {
            const organizations = await model.Organization.find({ cityId: cityId as object }).populate("cityId");

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
            const categoryId = req.query.categoryId;
            const organizationId = req.query.organizationId;
            if (!categoryId || !organizationId) {
                res.status(400).json("Bad request");
            }
            const products = await model.Product.find(
                                { group: categoryId as object, "organizations": organizationId as string },
                                { organizations: false }
                            );
            res.json(products);
        } catch (e: unknown) {
            console.log(e);
        }
    }

    public async getProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const product = await model.Product.findOne({ _id: id as string }, { organizations: false });
            if(!product){
                return res.status(404).json("Not found");
            }
            let sauces = null;
            if(!product.code.match(/^SO-\d+$/)){
                sauces = await model.Product.find({code: {$regex: /^SO-\d+$/}});
            }

            res.json({
                sauces,
                product
            });
        } catch (e: unknown) {
            console.log(e);
        }
    }
}

export default Api;