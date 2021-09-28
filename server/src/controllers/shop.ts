import mongoose, { Document } from "mongoose";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User, Cart, Product } from "../db/models";
import { IProduct } from "../db/models/api/Product";
import { IUserSchema } from "../db/models/profile/User";
import { FindOneAndUpdateReturnType, ILastErrorObject } from "../types/mongoose";
import calcTotalPrice from "../utils/calcTotalPrice";
import { ICartSchema } from "../db/models/shop/Cart";

type Body = {
    username: string,
    productId: string
}

class Shop {
    public async addToCart(req: Request<{}, {}, Body>, res: Response) {
        const body = req.body;
        try {
            const product: IProduct = await Product.findOne({ _id: body.productId });
            if (!product) {
                throw Error("Bad request");
            }

            const user: IUserSchema<ICartSchema<unknown, IProduct>, unknown> & Document
                = await User.findOne({ username: body.username })
                    .populate({
                        path: "cart",
                        populate: {
                            path: "product"
                        }
                    });

            /*
            * Обновляем количество если товар уже в корзине, иначе создаем
            */
            const productInCart: FindOneAndUpdateReturnType<ICartSchema & Document, ILastErrorObject> = await Cart.findOneAndUpdate({
                user: user._id,
                product: body.productId as string
            },
                {
                    $setOnInsert: {
                        userId: user._id,
                        product: product._id
                    },
                    $inc: { amount: 1 },
                },
                {
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

            if (!productInCart.lastErrorObject.updatedExisting) {
                await user.updateOne({
                    $addToSet: {
                        cart: productInCart.value._id
                    }
                })
                await user.save();
            }

            const totalPrice = calcTotalPrice(user.cart);
            res.status(200).json({
                _id: productInCart.value._id,
                product: productPopulate.product,
                amount: productPopulate.amount,
                totalPrice
            });
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
                    $pull: {
                        cart: cartId
                    }
                }).populate({
                    path: "cart",
                    populate: {
                        path: "product"
                    }
                });

                const totalPrice = calcTotalPrice(user.cart);
                res.status(200).json({
                    cartId,
                    totalPrice
                });


            } else {
                throw Error();
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
                    update = 1
                    break;
                }
                case "dec": {
                    update = -1
                    break;
                }
                default: throw Error("Bad request");
            }

            const cart = await Cart.findOne({_id: cartId});

            cart.amount += update;
            
            
            if (cart.amount >= 1) {

               let resultCart = await cart.save()

                resultCart = await Cart.populate(resultCart, {path: "product", select:{user: 0}});

                //console.log(resultCart);
                res.status(200).json(resultCart); 
            }
            
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
                    },
                    select: {
                        user: 0
                    }
                })

            const totalPrice = calcTotalPrice(user.cart);
            res.status(200).json({
                cart: user.cart,
                totalPrice
            });
        } catch (e) {
            console.log(e);
            res.status(400).json("Bad request");
        }
    }
}

export default Shop;