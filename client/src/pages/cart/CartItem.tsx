import { FC, useCallback, useMemo } from "react";
import { ChangeAmountType } from "../../types/actions/cart";
import { useDispatch } from "react-redux";
import { removeOne, changeAmount } from "../../store/actions/cart";
import debounce from 'lodash.debounce';
import { ICart } from "../../types/responses";


const CartItem: FC = ({amount, product, _id}: any)=>{
    const dispatch = useDispatch();
    const removeHandler = ()=>{
        dispatch(removeOne(_id));
    }

    const changeAmountHandler = (e: any, { id, type }: ChangeAmountType) =>
        !(amount <= 1 && type == 'dec') && dispatch(changeAmount({ id, type}))
    
    const debouncedChangeHandler = useMemo(() => debounce(changeAmountHandler, 500),[amount])  

    return (
        <div className="cart__item">
            <div className="cart__item__img-wrap">
                {<img src={product.images?.imageUrl} alt={product.name} /> }
            </div>
            <div className="cart__item__middle">
                <div className="cart__item__title">{product.name}</div>
                <div className="cart__item__count-option">
                    <div className={amount <= 1 ? "cart__item__disable" : "cart__item__decriment"} onClick={e => debouncedChangeHandler(e, {id: _id, type:"dec"})}>
                        <img src={require("../../assets/i/minus.svg").default} alt="минус"/>
                    </div>
                    <div className="cart__item__count">{amount}</div>
                    <div className="cart__item__increment" onClick={(e)=> debouncedChangeHandler(e, {id: _id, type:"inc"})}>
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