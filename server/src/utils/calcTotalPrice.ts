import {IProduct} from "../db/models/api/Product";

type ArgType = {
    product: IProduct,
    amount: number
}

export default function(cart: ArgType[]){
    return cart.reduce((acc, el)=>acc+(el.amount*el.product.price), 0);
}