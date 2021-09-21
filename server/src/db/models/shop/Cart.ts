import mongoose, {Schema, model, RefType} from "mongoose";

export interface ICartSchema{
    user: RefType,
    product: RefType,
    amount: number
}

const CartSchema = new Schema<ICartSchema>({
    user: {
        required: true,
        ref: "User",
        type: mongoose.Types.ObjectId,
    },
    product: {
        required: true,
        ref: "Product",
        type: String
    },
    amount: {
        type: Number,
        default: 1
    }
}, {versionKey: false})

export default model("Cart", CartSchema);