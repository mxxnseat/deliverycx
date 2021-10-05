import {IProduct} from "../db/models/api/Product";
import Cart, { CartType } from "../db/models/shop/Cart";


export default async function(cart: Omit<CartType<IProduct>, "_id">[], cartId: string){
    const totalPrice = cart.reduce((acc, el)=>acc+(el.amount*el.product.price), 0);
    await Cart.updateOne({_id: cartId}, {totalPrice});
    return totalPrice;
}