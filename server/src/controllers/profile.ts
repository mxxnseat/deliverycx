import mongoose from "mongoose";
import { Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import calcTotalPrice from "../utils/calcTotalPrice";
import { User, Cart, Order } from "../db/models";
import { IUserSchema } from "../db/models/profile/User";
import generateUserTokens from "../helpers/generateTokens";



class Profile {
    public async login(req: Request, res: Response) {
        const authToken = req.headers.authorization as string;
        try {
            if (authToken !== undefined) {
                const token = authToken.split(" ")[1];

                jwt.verify(token, process.env.JWT_SECRET as string, async (err, _) => {
                    const decode = jwt.decode(token, { complete: true })?.payload;
                    const username = decode?.username;

                    const user = await User.findOne({ username });

                    if (!user) {
                        res.status(401).json("Not authorized");
                        return;
                    }
                    if (err) {
                        if (err?.name === "TokenExpiredError") {
                            return jwt.verify(user.token.refresh, process.env.JWT_SECRET as string, async (err: any, _: any) => {

                                if (err) {
                                    res.status(401).json("Not authorized, " + err.name);
                                    return;
                                }

                                const { access, refresh } = generateUserTokens(user.username);
                                user.token = {
                                    access, refresh
                                }
                                await user.save();

                                res.status(200).json(access);
                            });
                        }
                        else {
                            return res.status(401).json("Not authorized, " + err?.name);
                        }
                    }
                    const { access, refresh } = generateUserTokens(user.username);
                    user.token = {
                        access, refresh
                    }
                    await user.save();
                    res.status(200).json(access);

                });
            } else {
                const access = await this.register();
                if (!access) {
                    throw Error();
                }
                res.status(200).json(access);
            }
        } catch (e: any) {
            console.log(e);
            res.status(401).json("Not authhorized, \n" + e?.message);
        }
    }

    async register(): Promise<string | void> {
        try {
            const { access, refresh, username } = generateUserTokens();
            const User_id = new mongoose.Types.ObjectId();
            const Cart_id = new mongoose.Types.ObjectId();
            const cart = await Cart.create({
                _id: Cart_id,
                user: User_id,
                products: []
            });
            const order = await Order.create({
                user: User_id,
                orders: []
            });

            await User.create({
                _id: User_id,
                token: {
                    access,
                    refresh
                },
                cart: Cart_id,
                username
            });

            return access;
        } catch (e) {
            console.log(e);
        }
    }
    public async updateProfile(req: Request, res: Response) {
        const { username, phone, email, organization, name } = req.body;

        try {
            const user = await User.findOneAndUpdate({ username }, {
                name,
                phone,
                email,
                organization
            }, {
                fields: {
                    token: 0,
                    cart: 0,
                    organization: 0
                }
            });


            res.status(200).json({
                message: "ok",
                user
            })
        } catch (e: unknown) {
            console.log(e);
            res.status(500).json("Server error");
        }
    }
    public async getProfile(req: Request, res: Response) {
        const username = req.body.username;

        try {
            const user = await User.findOne({ username }, { token: 0, _id: 0 })
                .populate({
                    path: "organization",
                    populate: {
                        path: "cityId"
                    }
                })
                .populate({ 
                    path: "cart",
                    populate: {
                        path: "products.product"
                    },
                    select: {
                        user: 0,
                        _id: 0
                    }
                })

            console.log(user);

            if (!user.organization) {
                return res.status(200).json({
                    isAuth: false
                });
            }
            console.log(user);

            if (!user.cart) user.cart = [];

            console.log(user);

            res.status(200).json({
                isAuth: true,
                user,
            })
        } catch (e: unknown) {
            console.log(e);
            res.status(500).json("Server error");
        }
    }
}

export default Profile;