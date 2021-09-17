import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User, Cart, Product } from "../db/models";

class Shop {
    public async addToCart(req: Request, res: Response) {
        const body = req.body;
        console.log(body);
        try {
            const product = await Product.findOne({ _id: body.productId });
            console.log(product);
            if (!product) {
                throw Error("Bad request");
            }

            const cartId = new mongoose.Types.ObjectId();
            const user = await User.findOneAndUpdate(
                { username: body.username },
                {
                    $addToSet: {
                        cart: cartId
                    }
                });
            if (user) {
                await Cart.create({ _id: cartId, userId: user._id, productId: product._id });
            } else {
                throw Error("Bad request");
            }


            res.status(200).json("Product in cart");
        } catch (e: unknown) {
            console.log(e);
            res.status(400).json("Bad request");
        }
    }
    public async removeOne(req: Request, res: Response) {
        const username = jwt.decode(req.headers.authorization as string, {complete: true})?.payload?.username;
        const cartId = req.params.cartId as string;

        try{
            const cart = await Cart.findOneAndDelete({_id: cartId});
            if(cart){
                const user = await User.findOneAndUpdate({username}, {
                    $pull: {cart:  cart._id}
                });

                res.status(200).json("OK");
            }
        }catch(e: unknown){
            console.log(e);
            res.status(400).json("Bad request");
        }
    }
    public async clear(req: Request, res: Response){
        const username = jwt.decode(req.headers.authorization as string, {complete: true})?.payload?.username;
        const userId = req.body.userId;

        try{

            if(!userId){
                throw Error("Bad request");
            }

            await Cart.deleteMany({userId});
            await User.updateOne({username}, {
                $set:{cart: []} 
            });

            res.status(200).json("OK");
        }catch(e: unknown){
            console.log(e);
            res.status(400).json("Bad request");
        }
    }
    public async changeAmount(req: Request, res: Response){
        try{
            const type: "inc" | "dec" = req.body.type;
            const cartId = req.body.cartId;
            let update = {};

            switch(type){
                case "inc": {
                    update = {$inc: {amount: 1}}
                    break;
                }
                case "dec": {
                    update = {$inc: {amount: -1}}
                    break;
                }
                default: throw Error("Bad request");
            }

            const cart = await Cart.findOneAndUpdate({_id: cartId}, update);// here save instance and use in switch

        }catch(e: unknown){
            console.log(e);
            res.status(400).json("Bad request");
        }
    }
}

export default Shop;