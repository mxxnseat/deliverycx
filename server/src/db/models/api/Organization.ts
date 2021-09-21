import mongoose, {Schema, model, mongo, RefType} from "mongoose";


export interface IOrganization{
    _id: string,
    cityId: RefType,
    longitude: number,
    latitude: number,
    street: string,
    contacts: {
        phone: string,
        email?: string
    },
}

const OrganizationSchema = new Schema<IOrganization>({
    _id: {
        required: true,
        type: String
    },
    cityId: {
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
    }
}, { versionKey: false })

export default model("Organization", OrganizationSchema);