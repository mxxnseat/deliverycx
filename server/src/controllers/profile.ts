import mongoose from "mongoose";
import { Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import calcTotalPrice from "../utils/calcTotalPrice";
import { User, Cart, Order, Favorite } from "../db/models";
import { IUserSchema } from "../db/models/profile/User";
import generateUserTokens from "../helpers/generateTokens";
import getProductsInCart from "../helpers/getProductsInCart";

class Profile {
  public async login(req: Request, res: Response) {
    try {
      const { username, tokens } = req.body;

      await User.updateOne({ username }, { refreshToken: tokens.refresh });

      res.cookie("refresh", tokens.refresh, {
        maxAge: 1000 * 3600 * 24 * 30,
        httpOnly: true,
      });
      res.status(200).json({ isAuth: false, access: tokens.access });
    } catch (e: any) {
      console.log(e);
      res.status(401).json("Not authhorized, \n" + e?.message);
    }
  }

  public async register(req: Request, res: Response) {
    try {
      const { organization } = req.body;
      let token = req.headers.authorization as string;
      token = token && token.split(" ")[1];
      const usernameFromToken = jwt.decode(token, { complete: true })?.payload
        ?.username;
      const userFind = await User.findOne({ username: usernameFromToken });

      if (userFind) {
        return res.status(200).json({
          isNew: false,
        });
      }

      const { access, refresh, username } = generateUserTokens();
      const User_id = new mongoose.Types.ObjectId();
      const Cart_id = new mongoose.Types.ObjectId();
      const Favorite_id = new mongoose.Types.ObjectId();
      const cart = await Cart.create({
        _id: Cart_id,
        user: User_id,
        products: [],
      });
      const order = await Order.create({
        user: User_id,
        orders: [],
      });
      const favorite = await Favorite.create({
        _id: Favorite_id,
        user: User_id,
        products: [],
      });

      await User.create({
        _id: User_id,
        refreshToken: refresh,
        cart: Cart_id,
        favorite: Favorite_id,
        organization,
        username,
      });
      res.cookie("refresh", refresh, {
        maxAge: 1000 * 3600 * 24 * 30,
        httpOnly: true,
      });
      res.status(200).json({
        isNew: true,
        access,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json("Server error");
    }
  }
  public async updateProfile(req: Request, res: Response) {
    const { username, phone, email, organization, name } = req.body;

    try {
      const user = await User.findOneAndUpdate(
        { username },
        {
          name,
          phone,
          email,
          organization,
        },
        {
          fields: {
            token: 0,
            cart: 0,
            organization: 0,
          },
        }
      );

      res.status(200).json({
        message: "ok",
        user,
      });
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
            path: "city",
          },
        })
        .populate({
          path: "cart",
          populate: {
            path: "products.product",
          },
          select: {
            user: 0,
            _id: 0,
          },
        });

      if (!user.organization) {
        return res.status(200).json({
          isAuth: false,
          user,
        });
      }
      const products = await getProductsInCart(
        user.cart.products,
        user.organization._id
      );
      res.status(200).json({
        isAuth: false,
        user: {
          ...user._doc,
          cart: {
            totalPrice: user.cart.totalPrice,
            products,
          },
        },
      });
    } catch (e: unknown) {
      console.log(e);
      res.status(500).json("Server error");
    }
  }
}

export default Profile;
