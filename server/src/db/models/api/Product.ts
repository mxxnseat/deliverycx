import mongoose, {Schema, model} from "mongoose";
import { IImage } from "./Group";

export interface IRef{
    type: mongoose.Types.ObjectId,
}
export interface IProduct{
    _id: string,
    name: string,
    code: string,
    order: number,
    images: IImage,
    isIncludedInMenu: boolean,
    price: number,
    group: string,
    category: string,
    organizations: string[],
    weight: number,
    measureUnit: "порц" | "шт",
    description: string,
    additionalInfo: string,
}

const ProductSchema = new Schema<IProduct>({
    _id: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    code: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    images: {
        imageUrl: {
            required: true,
            type: String
        },
    },
    isIncludedInMenu: {
        required: true,
        type: Boolean
    },
    order: Number,
    group: {
        required: true,
        type: String,
        ref: "Group"
    },
    category: {
        required: true,
        type: String,
        ref: "Category"
    },
    organizations: [
        {
            required: true,
            ref: "Organization",
            type: String
        }
    ],
    weight: {
        required: true,
        type: Number
    },
    measureUnit: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    additionalInfo: {
        required: true,
        type: String
    }
}, { versionKey: false });

export default model("Product", ProductSchema);