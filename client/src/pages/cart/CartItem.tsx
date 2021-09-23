import { FC } from "react";
import { AddToCartResponse } from "../../types/actions/cart";
import { useDispatch } from "react-redux";
import {removeOne} from "../../store/actions/cart";

const CartItem: FC<AddToCartResponse> = ({amount, _id, product})=>{
    const dispatch = useDispatch();
    const removeHandler = ()=>{
        dispatch(removeOne(_id));
    }

    return (
        <div className="cart__item">
            <div className="cart__item__img-wrap">
                <img src={product.images.imageUrl} alt={product.name} />
            </div>
            <div className="cart__item__middle">
                <div className="cart__item__title">{product.name}</div>
                <div className="cart__item__count-option">
                    <div className="cart__item__decriment">
                        <img src={require("../../assets/i/minus.svg").default} alt="минус" />
                    </div>
                    <div className="cart__item__count">{amount}</div>
                    <div className="cart__item__increment">
                        <img src={require("../../assets/i/gray_plus.svg").default} alt="плюс" />
                    </div>
                </div>
            </div>
            <div className="cart__item__right">
                <div className="cart__item__price">{product.price} ₽</div>
                <button className="cart__item__remove" onClick={removeHandler}>
                    <img src={require("../../assets/i/remove.svg").default} alt="Удалить" />
                </button>
            </div>
        </div>
    );
}

export default CartItem;