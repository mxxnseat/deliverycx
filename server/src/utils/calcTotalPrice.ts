import { ICartSchema } from "db/models/shop/Cart";
import {IProduct} from "../db/models/api/Product";

export default function(cart: ICartSchema<unknown, IProduct>[]){
    return cart.reduce((acc, el)=>acc+(el.amount*el.product.price), 0);
}