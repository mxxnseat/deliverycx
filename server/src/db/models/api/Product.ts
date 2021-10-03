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
    category: RefType,
    weight: number,
    measureUnit: "порц" | "шт",
    description: string,
    additionalInfo: string,
}
export interface IProductSchema {
    _id: string,
    organization: RefType,
    products: IProduct[],
    revision: number
}

const ListSchema = new Schema({
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
        ,
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
    }
})

const ProductSchema = new Schema({
    _id: {
        required: true,
        type: String
    },
    organization: {
        ref: "organization",
        type: String
    },
    products: [ListSchema],
    revision: Number
}, { versionKey: false });

export default model("Products", ProductSchema);