import mongoose, {Schema, model, mongo, RefType} from "mongoose";


export interface IOrganization{
    _id: string,
    city: RefType,
    longitude: number,
    latitude: number,
    street: string,
    contacts: {
        phone: string,
        email?: string
    },
    products: RefType,
    categories: RefType,
    groups: RefType,
    workTime: string
}

const OrganizationSchema = new Schema<IOrganization>({
    _id: {
        required: true,
        type: String
    },
    city: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: "City"
    },
    longitude: {
        required: true,
        type: Number
    },
    latitude: {
        required: true,
        type: Number
    },
    street: {
        required: true,
        type: String
    },
    contacts: {
        phone: {
            required: true,
            type: String
        },
        email: String
    },
    products:{
        required: true,
        type: mongoose.Types.ObjectId,
        ref: "product"
    },
    workTime: String
}, { versionKey: false })

export default model("Organization", OrganizationSchema);