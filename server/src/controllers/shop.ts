import { Request, Response } from "express";
import { User, Cart, Product, Order } from "../db/models";
import createOrder, { createOrderType, CustomerData } from "../helpers/createOrder";
import getProductsInCart from "../helpers/getProductsInCart";
import calcTotalPrice from "../utils/calcTotalPrice";
import iiko from "../services/iiko";
import { separateAddress, SeparateType } from "../helpers/geoCoder";
import Favorite from "../db/models/shop/Favorites";

import validationCount from "../utils/cartValidate/validationCount";

type AddToCartBody = {
    username: string,
    product: string,
    organization: string
}
type CreateOrderBody = {
    username: string,
    address: string,
    notCall: boolean,
    payment: object,
    cart_choice: string,
    flat: string,
    floor: string,
    intercom: string,
    entarance: string,
    city: string
} & CustomerData;


class Shop {
    public async addToCart(req: Request<{}, {}, AddToCartBody>, res: Response) {
        const { product, username } = req.body;
        try {
            const user = await User.findOne({ username: username })

            if (!user) {
                throw Error("Bad request");
            }

            const productOne = await Product.findOne({ organization: user.organization, "products.id": product });
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
    public async addToFavorite(req: Request, res: Response) {
        try {
            const { username, productId: id } = req.body;

            const user = await User.findOne({ username });
            
            const product = await Product.aggregate([
                { $unwind: "$products" },
                {
                    $match: {
                        organization: user.organization, "products.id": id
                    }
                },
                {
                    $project: {
                        products: 1
                    }
                }
            ]);
            if (!product.length) throw Error('Product not found');
            console.log(product[0]);
            const isFindFavorite = await Favorite.findOne({ user: user._id, "products.id":id });

            let updateOption = {};
            const returnData = {
                isActive: false
            }
            if(isFindFavorite){
                updateOption = {
                    $pull: {
                        "products":{ id }
                    }
                }
                returnData.isActive = false;
            }else{
                updateOption = {
                    $push: {
                        products: product[0].products
                    }
                }
                returnData.isActive = true;
            }

            await Favorite.updateOne({user: user._id}, updateOption);

            res.status(200).json({
                message: "success",
                ...returnData
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
            const { cart, username, count } = req.body;
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
        const {
            username,
            address,
            comment,
            phone,
            date,
            flat,
            floor,
            city,
            intercom,
            entarance,
            promocode,
            cart_choice,
            name,
            payment,
            times,
            notCall
        } = req.body;

        try {
            const user = await User.findOne({ username: username });

            if (!user) {
                throw Error();
            }

            const cart = await Cart.findOne({ _id: user.cart });
            const cartList = await getProductsInCart(cart.products, user.organization);

            const errors = await validationCount(cartList);
            if(Object.keys(errors).length > 0){
                return res.status(400).json({
                    success: false,
                    errors
                });
            }

            const orderBody = createOrder({ address, flat, floor, intercom, entarance, city}, user.organization, {
                name,
                comment,
                date,
                phone,
                times,
                promocode
            }, cartList);

            let { status, message } = await iiko.iikoMethodBuilder(() => iiko.createOrder(orderBody));
            console.log(message);
            if (status !== 200) {
                return res.status(status).json({
                    success: false,
                    errors: {
                        '500':{
                            message: `Some error ${message}`
                        }
                    }
                });
            }
            await Cart.updateOne({ _id: user.cart }, {
                $set: {
                    products: [],
                    totalPrice: 0
                }
            }, { new: false })
            const order = await Order.findOneAndUpdate(
                { user: user._id },
                {
                    $push: {
                        orders: {
                            products: cart.products,
                            totalPrice: cart.totalPrice,
                        }
                    }
                });


            const orderNum = await Order.aggregate([
                { $project: { orders: 1 } },
                { $unwind: "$orders" },
                { $group: { _id: null, count: { $sum: 1 } } }
            ]);


            await User.updateOne({ username }, {
                isVerify: true,
                phone,
                name
            });
            res.status(200).json({
                success: true,
                orderNumber: orderNum[0].count
            });
        } catch (e: unknown) {
            console.log(e);
            res.status(404).json({
                success: false,
                messsage: e
            })
        }
    }
}

export default Shop;