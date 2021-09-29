import mongoose, { Document } from "mongoose";
import { Request, Response } from "express";
import { User, Cart, Product } from "../db/models";
import { IProduct } from "../db/models/api/Product";
import { IUserSchema } from "../db/models/profile/User";
import { FindOneAndUpdateReturnType, ILastErrorObject } from "../types/mongoose";
import createOrder, { createOrderType } from "../helpers/createOrder";
import calcTotalPrice from "../utils/calcTotalPrice";
import { ICartSchema } from "../db/models/shop/Cart";
import iiko from "../services/iiko";

type AddToCartBody = {
    username: string,
    productId: string
}
type CreateOrderBody = {
    username: string,
    name: string,
    address: string,
    phone: string,
    comment: string,
    date: string,
    paymentMethod: string
}

class Shop {
    public async addToCart(req: Request<{}, {}, AddToCartBody>, res: Response) {
        const body = req.body;
        try {
            const product = await Product.findOne({ _id: body.productId });
            if (!product) {
                throw Error("Bad request");
            }

            const user = await User.findOne({ username: body.username })

            if (!user) {
                throw Error("Bad request");
            }

            let cart = await Cart.findOne({ _id: user.cart });

            const isFind = cart.products.find((el: any) => el.product === body.productId);

            if (isFind) {
                cart = await Cart.findOneAndUpdate({ _id: user.cart, "products.product": body.productId }, {
                    $inc: {
                        "products.$.amount": 1
                    }
                }, { new: true })
            } else {
                cart = await Cart.findOneAndUpdate({ _id: user.cart }, {
                    $push: {
                        products: {
                            product: body.productId
                        }
                    }
                }, { new: true });
            }

            await cart.populate("products.product");

            res.status(200).json({
                products: cart.products
            });
        } catch (e: unknown) {
            console.log(e);
            res.status(400).json("Bad request");
        }
    }
    public async removeOne(req: Request, res: Response) {
        const { username, cartId } = req.body;

        try {
            const user = await User.findOne({username});

            const cart = await Cart.findOneAndUpdate({_id: user.cart, "products._id": cartId},{
                $pull: {
                    "products": {
                        _id: cartId
                    }
                }
            },{new: true}).populate("products.product");

            const totalPrice = calcTotalPrice(cart.products);
            res.status(200).json({
                products: cart.products
            })
        } catch (e: unknown) {
            console.log(e);
            res.status(400).json("Bad request");
        }
    }
    public async clear(req: Request, res: Response) {
        const username = req.body.username;

        try {
            const user = await User.findOne({ username });
            const cart = await Cart.findOneAndUpdate({_id: user.cart}, {
                $set: {
                    products: []
                }
            }, {new: true})
            if (!user) {
                throw Error();
            }


            res.status(200).json({
                products: cart.products
            });
        } catch (e: unknown) {
            console.log(e);
            res.status(400).json("Bad request");
        }
    }
    public async changeAmount(req: Request, res: Response) {
        try {
            const type: "inc" | "dec" = req.body.type;
            const {cartId, username} = req.body;
            let update = {};

            const user = await User.findOne({ username });

            switch (type) {
                case "inc": {
                    update = 1
                    break;
                }
                case "dec": {
                    update = -1
                    break;
                }
                default: throw Error("Bad request");
            }

            const cart = await Cart.findOne({_id: user.cart, "products._id": cartId}).populate("products.product");
            console.log(new mongoose.mongo.ObjectId(cartId))
            const isFind = cart.products.find((el: any)=>el._id.toString() === new mongoose.mongo.ObjectId(cartId).toString());


            isFind.amount+=update;

            await cart.save();

            const totalPrice = calcTotalPrice(cart.products);
            res.status(200).json({
                products: cart.products
            });
        } catch (e: unknown) {
            console.log(e);
            res.status(400).json("Bad request");
        }
    }
    public async getCart(req: Request, res: Response) {
        const username = req.body.username;

        try {
            const user = await User.findOne({ username });
            const cart = await Cart.findOne({_id: user.cart}).populate("products.product");

            const totalPrice = calcTotalPrice(cart.products);
            res.status(200).json({
                products: cart.products
            });
        } catch (e) {
            console.log(e);
            res.status(400).json("Bad request");
        }
    }
    public async createOrder(req: Request<{}, {}, CreateOrderBody>, res: Response) {
        await iiko.getToken();
        const token = iiko.token;
        const body = req.body;
        const createOrderBody: createOrderType = await createOrder({
            address: body.address,
            name: body.name,
            phone: body.phone,
            username: body.username,
            comment: body.comment,
            date: body.date
        });

        res.json(createOrderBody);
    }
}

export default Shop;