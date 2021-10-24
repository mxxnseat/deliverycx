import { Schema, model, RefType } from "mongoose";

export interface IGroup {
    _id: string,
    name: string,
    code: string,
    order: number,
    description: string,
    organization: RefType,
    image: string,
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
    description: {
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
    image: {
        required: true,
        type: String
    },
    organization: {
        required: true,
        type: String,
        ref: "Organization"
    },
    isIncludedInMenu: {
        required: true,
        type: Boolean
    }
}, { versionKey: false })

export default model("Group", GroupSchema);