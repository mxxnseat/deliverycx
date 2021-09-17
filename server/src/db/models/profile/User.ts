import mongoose, {model, Schema} from "mongoose";

interface IRef{
    type: mongoose.Types.ObjectId,
}
export interface IUserSchema{
    _id: mongoose.Types.ObjectId,
    token: {
        access: string,
        refresh: string
    },
    cart: IRef[]
    username: string,
    name?: string,
    phone?: string,
    isVerify: boolean
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
    cart: [
        {
            ref: "Cart",
            type: mongoose.Types.ObjectId,
        }
    ],
    username: String,
    name: {
        default: '',
        type: String,
    },
    phone: String,
    isVerify: {
        required: true,
        type: Boolean,
        default: false
    }
}, {versionKey: false});

export default model("User", UserSchema);