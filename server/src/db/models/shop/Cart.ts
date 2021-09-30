import mongoose, { Schema, model, RefType } from "mongoose";
import calcTotalPrice from "../../../utils/calcTotalPrice";

export type CartType<T> = {
    product: T,
    amount: number
}
export interface ICartSchema<U = RefType, P = RefType> {
    _id: mongoose.Types.ObjectId,
    user: U,
    products: CartType<P>[],
    totalPrice: number
}

export const CartSchema = new Schema<ICartSchema>({
    user: {
        required: true,
        ref: "User",
        type: mongoose.Types.ObjectId,
    },
    products: [
        {
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
        }
    ],
    totalPrice: {
        required: true,
        default: 0,
        type: Number
    }
}, { versionKey: false });

CartSchema.post("findOneAndUpdate", async function(){

    const cart = await Model.findOne({_id: this.getQuery() as mongoose.Types.ObjectId}).populate("products.product");
    
    const totalPrice = calcTotalPrice(cart.products);
    await Model.updateOne({_id: this.getQuery() as mongoose.Types.ObjectId}, {totalPrice});
});

const Model = model("Cart", CartSchema);


export default Model;