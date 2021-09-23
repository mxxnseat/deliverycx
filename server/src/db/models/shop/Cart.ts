import mongoose, { Schema, model, RefType } from "mongoose";

export interface ICartSchema {
    _id: mongoose.Types.ObjectId,
    user: RefType,
    product: RefType,
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
        default: 1
    }
}, { versionKey: false });


export default model("Cart", CartSchema);