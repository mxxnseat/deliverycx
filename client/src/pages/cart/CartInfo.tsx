import { ChangeEvent, FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePrevious } from "../../customHooks/usePrevious";
import { RootState } from "../../store";

import {changePromoCode} from "../../store/actions/cart";
import {IInitialState} from "../../types/actions/cart";

const CartInfo: FC = () => {
    const cartState = useSelector((state: RootState) => {
        return state.cart
    });
    const dispatch = useDispatch();

    return (
        <div className="cart__order-info">
            <div className="cart__order__sale-wrap">
                <div className="cart__order-info__title">Скидка</div>

                <input onChange={(e)=>dispatch(changePromoCode(e.target.value))} value={cartState.promocode} className="cart__order-info__sale-input" placeholder="ВАШ ПРОМОКОД" type="text" />

                <div className="cart__order__sale">0 ₽</div>
            </div>
            <div className="cart__order__total-wrap">
                <div className="cart__order__total-title">Итого</div>
                <div className="cart__order__total-sum">{cartState.totalPrice} ₽</div>
            </div>
        </div>
    )
}

export default CartInfo;