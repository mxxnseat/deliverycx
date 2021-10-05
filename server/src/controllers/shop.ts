import mongoose, { Document } from "mongoose";
import { Request, Response } from "express";
import { User, Cart, Product, Order } from "../db/models";
import { IProduct } from "../db/models/api/Product";
import { IUserSchema } from "../db/models/profile/User";
import { FindOneAndUpdateReturnType, ILastErrorObject } from "../types/mongoose";
import createOrder, { createOrderType } from "../helpers/createOrder";
import getProductsInCart from "../helpers/getProductsInCart";
import calcTotalPrice from "../utils/calcTotalPrice";
import { ICartSchema } from "../db/models/shop/Cart";
import iiko from "../services/iiko";

type AddToCartBody = {
    username: string,
    product: string,
    organization: string
}
type CreateOrderBody = {
    username: string,
    name: string,
    address: string,
    phone: string,
    comment: string,
    date: string,
    paymentMethod: string,
    promocode: string,
    cart_choice: string,

}

class Shop {
    public async addToCart(req: Request<{}, {}, AddToCartBody>, res: Response) {
        const {product, username} = req.body;
        try {
            const user = await User.findOne({ username: username })

            if (!user) {
                throw Error("Bad request");
            }

            const productOne = await Product.findOne({ organization: user.organization, "products.id": product});
            if (!productOne) {
                throw Error("Bad request");
            }

            let cart = await Cart.findOne({ _id: user.cart });

            const isFind = cart.products.find((el: any) => el.product === product);

            if (isFind) {
                cart = await Cart.findOneAndUpdate({ _id: user.cart, "products.product": product }, {
                    $inc: {
                        "products.$.amount": 1
                    }
                }, { new: true });
            } else {
                cart = await Cart.findOneAndUpdate({ _id: user.cart }, {
                    $push: {
                        products: {
                            product
                        }
                    }
                }, { new: true });
            }


            const products = await getProductsInCart(cart.products, user.organization);

            

            const totalPrice = await calcTotalPrice(products, cart._id);
            res.status(200).json({
                products,
                totalPrice
            });
        } catch (e: unknown) {
            console.log(e);
            res.status(400).json("Bad request");
        }
    }
    public async removeOne(req: Request, res: Response) {
        const { username, cart } = req.body;

        try {
            const user = await User.findOne({ username });

            const carts = await Cart.findOneAndUpdate({ _id: user.cart, "products._id": cart }, {
                $pull: {
                    "products": {
                        _id: cart
                    }
                }
            }, { new: true });
            
            const products = await getProductsInCart(carts.products, user.organization);

            const totalPrice = await calcTotalPrice(products, cart._id);
            res.status(200).json({
                products,
                totalPrice
            });
        } catch (e: unknown) {
            console.log(e);
            res.status(400).json("Bad request");
        }
    }
    public async clear(req: Request, res: Response) {
        const username = req.body.username;

        try {
            const user = await User.findOne({ username });
            const cart = await Cart.findOneAndUpdate({ _id: user.cart }, {
                $set: {
                    products: []
                }
            }, { new: true })
            if (!user) {
                throw Error();
            }
            res.status(200).json({
                products: [],
                totalPrice: 0
            });
        } catch (e: unknown) {
            console.log(e);
            res.status(400).json("Bad request");
        }
    }
    public async changeAmount(req: Request, res: Response) {
        try {
            const type: "inc" | "dec" = req.body.type;
            const { cart, username,count } = req.body;
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

            let carts = await Cart.findOne({ _id: user.cart, "products._id": cart });

            const updateAmount = count;
            console.log(count)

            carts = await Cart.findOneAndUpdate({ _id: user.cart, "products._id": cart }, {
                $set: {
                    "products.$.amount": updateAmount
                }
            }, { new: true });

            const products = await getProductsInCart(carts.products, user.organization);
            const totalPrice = await calcTotalPrice(products, cart._id);
            res.status(200).json({
                products,
                totalPrice
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
            const cart = await Cart.findOne({ _id: user.cart });

            const products = await getProductsInCart(cart.products, user.organization);
            const totalPrice = await calcTotalPrice(products, cart._id);
            res.status(200).json({
                products,
                totalPrice
            });
        } catch (e) {
            console.log(e);
            res.status(400).json("Bad request");
        }
    }
    public async createOrder(req: Request<{}, {}, CreateOrderBody>, res: Response) {
        const username = req.body.username;

        try {
            const user = await User.findOne({ username: username });

            if (!user) {
                throw Error();
            }


            const cart = await Cart.findOneAndUpdate({ _id: user.cart }, {
                $set: {
                    products: []
                }
            }, { new: false })


            const order = await Order.findOneAndUpdate(
                { user: user._id },
                {$push: {
                    orders: {
                        products: cart.products,
                        totalPrice: cart.totalPrice,
                        orderNum: 2
                    }
                }
            });

            const orderNum = await Order.aggregate([
                { $project: { orders: 1 }},
                { $unwind: "$orders" },
                { $group: {_id: null, count: { $sum: 1 }}}
            ]);

            res.status(200).json({
                success: true,
                orderNumber: orderNum[0].count
            });
        } catch (e: unknown) {
            console.log(e);
            res.status(404).json({
                success: false
            })
        }
    }
}

export default Shop;