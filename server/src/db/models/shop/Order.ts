import {Schema, model, Types, Document, RefType, Date} from "mongoose";
import { CartType } from "./Cart";

interface IOrder{
    products: CartType<string>[],
    date: Date,
    totalPrice: number,
    orderNum: number
}

interface IOrderSchema extends Document{
    user: RefType,
    orders: IOrder[]
}

const OrderSchema = new Schema<IOrderSchema>({
    user: {
        type: Types.ObjectId,
        ref: "User"
    },
    orders: [
        {
            products: [{
                product: {
                    type: String,
                    ref: "Products"
                },
                amount: Number
            }],
            date: {
                type: Date,
                default: Date.now
            },
            totalPrice: Number,
            orderNum: Number
        }
    ]
})

const Model = model("Order", OrderSchema);

export default Model;