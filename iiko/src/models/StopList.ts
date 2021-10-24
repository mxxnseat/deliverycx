import mongoose, {Schema, model, RefType} from "mongoose";

export interface IStopList{
    organization: RefType,
    products: Array<{
        productId: string,
        balance: number
    }>
}

const StopListSchema = new Schema<IStopList>({
    organization: {
        type: String,
        ref: "Organization"
    },
    products: [{
        productId: String,
        balance: Number
    }]
}, {versionKey: false});

export default model("StopList", StopListSchema);