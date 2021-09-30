import mongoose, {model, Schema, RefType} from "mongoose";


export interface IUserSchema{
    token: {
        access: string,
        refresh: string
    },
    cart: RefType,
    username: string,
    name?: string,
    phone?: string,
    isVerify: boolean,
    organization: RefType,
    orderHistory: RefType
}
const UserSchema = new Schema<IUserSchema>({
    token: {
        access: {
            required: true,
            type: String
        },
        refresh: {
            required: true,
            type: String
        }
    },
    cart: {
        ref: "Cart",
        type: mongoose.Types.ObjectId,
    },
    username: String,
    name: {
        required: false,
        type: String
    },
    phone: {
        required: false,
        type: String
    },
    isVerify: {
        required: true,
        type: Boolean,
        default: false
    },
    organization: {
        type: String,
        ref: "Organization"
    },
    orderHistory: {
        type: mongoose.Types.ObjectId,
        ref: "Order"
    }
}, {versionKey: false});

export default model("User", UserSchema);