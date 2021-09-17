import {Schema, model} from "mongoose";

export interface ICategory{
    _id: string,
    name: string
}

const CategorySchema = new Schema<ICategory>({
    _id: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    }
}, { versionKey: false })

export default model("Category", CategorySchema);