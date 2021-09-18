import mongoose, {Schema, model} from "mongoose";

interface ICartSchema{
    userId: {
        type: mongoose.Types.ObjectId,
    },
    product: {
        type: string
    },
    amount: number
}

const CartSchema = new Schema<ICartSchema>({
    userId: {
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