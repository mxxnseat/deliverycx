import {Schema, model} from "mongoose";

export type Image = {
    imageUrl: string
}

export interface IGroup{
    _id: string,
    name: string,
    code: string,
    order: number,
    images: Image,
    isIncludedInMenu: boolean
}

const GroupSchema = new Schema<IGroup>({
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
    order: {
        required: true,
        type: Number
    },
    images: {
        imageUrl: {
            required: true,
            type: String
        }
    },
    isIncludedInMenu: {
        required: true,
        type: Boolean
    }
}, { versionKey: false })

export default model("Group", GroupSchema);