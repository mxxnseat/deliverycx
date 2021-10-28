import mongoose, { Schema, model, RefType, SchemaType } from "mongoose";

export interface IProduct {
    id: string,
    name: string,
    code: string,
    order: number,
    images: string,
    isIncludedInMenu: boolean,
    price: number,
    group: RefType,
    isFav?: boolean,
    category: RefType,
    weight: number,
    measureUnit: "порц" | "шт",
    description: string,
    additionalInfo: string,
}
export interface IProductSchema {
    organization: RefType,
    products: IProduct[],
    revision: number
}

export const ProductSchema = new Schema({
    id: String,
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
    image: {
        required: true,
        type: String
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
    },
    isFav: {
        required: false,
        type: Boolean
    }
})

const ProductListSchema = new Schema({
    organization: {
        ref: "organization",
        type: String
    },
    products: [ProductSchema],
    revision: Number
}, { versionKey: false });

export const ProductModel = model("product", ProductSchema);
export default model("Products", ProductListSchema);