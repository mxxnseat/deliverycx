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
            if (!product) {
                throw Error("Bad request");
            }

            const user = await User.findOne({ username: body.username });

            /*
            * Обновляем количество если товар уже в корзине, иначе создаем
            */
            const productInCart = await Cart.findOneAndUpdate({ user: user._id, product: body.productId }, {
                $setOnInsert: {
                    userId: user._id,
                    product: product._id
                },
                $inc: { amount: 1 },
            }, {
                new: true,
                upsert: true,
                rawResult: true
            });
            const productPopulate = await productInCart.value.populate({
                path: "product",
                select: {
                    organizations: 0
                }
            });

            if(!productInCart.lastErrorObject.updatedExisting){
                await user.update({
                    $addToSet: {
                        cart: productInCart._id
                    }
                })
                await user.save();
            }

            res.status(200).json({
                _id: productInCart.value._id,
                product: productPopulate,
            })

            // if (productInCart) {
            //     return res.status(200).json({
            //         product: productInCart.product,
            //         amount: productInCart.amount
            //     });
            // }



            // if (user) {
            //     await Cart.create({ _id: cartId, userId: user._id, product: product._id });
            // } else {
            //     throw Error("Bad request");
            // }


            // res.status(200).json({
            //     product: productInCart.product,
            //     amount: productInCart.amount
            // });
        } catch (e: unknown) {
            console.log(e);
            res.status(400).json("Bad request");
        }
    }
    public async removeOne(req: Request, res: Response) {
        const { username, cartId } = req.body;

        try {
            const cart = await Cart.findOneAndDelete({ _id: cartId });
            if (cart) {
                const user = await User.findOneAndUpdate({ username }, {
                    $pull: { cart: cart._id }
                });

                res.status(200).json("OK");
            }
        } catch (e: unknown) {
            console.log(e);
            res.status(400).json("Bad request");
        }
    }
    public async clear(req: Request, res: Response) {
        const username = req.body.username;

        try {
            const user = await User.findOneAndUpdate({ username }, {
                $set: { cart: [] }
            });

            if (!user) {
                throw Error();
            }

            await Cart.deleteMany({ userId: user._id as object });


            res.status(200).json("OK");
        } catch (e: unknown) {
            console.log(e);
            res.status(400).json("Bad request");
        }
    }
    public async changeAmount(req: Request, res: Response) {
        try {
            const type: "inc" | "dec" = req.body.type;
            const cartId = req.body.cartId;
            let update = {};

            switch (type) {
                case "inc": {
                    update = { $inc: { amount: 1 } }
                    break;
                }
                case "dec": {
                    update = { $inc: { amount: -1 } }
                    break;
                }
                default: throw Error("Bad request");
            }

            const cart = await Cart.findOneAndUpdate({ _id: cartId }, update);
            res.status(200).json("ok");
        } catch (e: unknown) {
            console.log(e);
            res.status(400).json("Bad request");
        }
    }
    public async getCart(req: Request, res: Response) {
        const username = req.body.username;

        try {
            const user = await User.findOne({ username })
                .populate({
                    path: "cart",
                    populate: {
                        path: "product"
                    }
                })

            res.status(200).json(user.cart);
        } catch (e) {
            console.log(e);
            res.status(400).json("Bad request");
        }
    }
}

export default Shop;