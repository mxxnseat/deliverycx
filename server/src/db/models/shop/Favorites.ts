import mongoose, {Schema, model} from "mongoose";
import {ProductSchema} from "../api/Product";

const FavoritesSchema = new Schema({
    user: {
        ref: "User",
        type: mongoose.Types.ObjectId
    },
    products: [ProductSchema]
}, {versionKey: false});

export default model("Favorite", FavoritesSchema);