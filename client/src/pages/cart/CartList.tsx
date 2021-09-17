import { FC } from "react";
import CartItem from "./CartItem";


const CartList: FC = () => {
    return (
        <div className="cart__goods-list">
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
        </div>
    )
}

export default CartList;