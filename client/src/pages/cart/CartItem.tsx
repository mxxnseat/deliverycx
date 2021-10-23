import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { ChangeAmountType } from "../../types/actions/cart";
import { useDispatch } from "react-redux";
import { removeOne, changeAmount } from "../../store/actions/cart";
import debounce from 'lodash.debounce';
import { ICart, ICartProducts, IProduct } from "../../types/responses";
import cn from "classnames";

interface IProps{
    isError: undefined | {message: string},
    amount: number,
    product: IProduct<string>,
    _id: string
}

const CartItem: FC<IProps> = ({amount, product, _id, isError})=>{
    console.log(isError);
    const CN = cn("cart__item", { error: isError });
    const dispatch = useDispatch();
    const [changeCount, setChangeCount] = useState<number>(amount)

    const debouncedChangeHandler = useMemo(() => debounce(({ id, type,count }: ChangeAmountType) => dispatch(changeAmount({ id, type,count, code: product.code})), 200),[amount]) 
    const removeHandler = ()=>{
        dispatch(removeOne(_id));
    }

    useEffect(() => () => debouncedChangeHandler.cancel(), [amount]);

    const changeCountHandler = ({ id, type, code}: ChangeAmountType) => {
        if (typeof changeCount === 'number') {
           switch (type) {
               case 'inc':
                setChangeCount(prev => {
                     let count =  prev + 1 
                     debouncedChangeHandler({ id, type,count, code })  
                     return count
                   });
                    break;
               case 'dec':
                   if (!(changeCount <= 1)) {
                    setChangeCount(prev => {
                            let count =  prev - 1 
                            debouncedChangeHandler({ id, type,count, code })  
                            return count
                       });
                   }  
                    break;
                default : setChangeCount(amount)
            } 
        }
    }

    return (
        <div className={CN}>
            <div className="cart__item__img-wrap">
                <img src={product.image} alt={product.name}/>
            </div>
            <div className="cart__item__middle">
                <div className="cart__item__title">{product.name}</div>
                <div className="cart__item__count-option">
                    <div className={changeCount <= 1 ? "cart__item__disable" : "cart__item__decriment"} onClick={e => changeCountHandler({id: _id, type:"dec", code: product.code})}>
                        <img src={require("../../assets/i/minus.svg").default} alt="минус"/>
                    </div>
                    <div className="cart__item__count">{changeCount}</div>
                    <div className="cart__item__increment" onClick={(e)=> changeCountHandler({id: _id, type:"inc", code: product.code})}>
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
            
            {isError && <div className="count-error">{isError.message}</div>}
        </div>
    );
}

export default CartItem;