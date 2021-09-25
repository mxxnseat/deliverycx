import mongoose, { Schema, model, RefType } from "mongoose";

export interface ICartSchema<U = RefType, P = RefType> {
    _id: mongoose.Types.ObjectId,
    user: U,
    product: P,
    amount: number
}

export const CartSchema = new Schema<ICartSchema>({
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
        default: 1,
        min: 1
    }
}, { versionKey: false });

export default model("Cart", CartSchema);