import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { ChangeAmountType } from "../../types/actions/cart";
import { useDispatch } from "react-redux";
import { removeOne, changeAmount } from "../../store/actions/cart";
import debounce from 'lodash.debounce';
import { ICart } from "../../types/responses";
import { number } from "yup/lib/locale";


const CartItem: FC = ({amount, product, _id}: any)=>{
    const dispatch = useDispatch();
    const [changeCount, setChangeCount] = useState<number>(amount)

    const debouncedChangeHandler = useMemo(() => debounce(({ id, type,count }: ChangeAmountType) => dispatch(changeAmount({ id, type,count})), 200),[amount]) 
    const removeHandler = ()=>{
        dispatch(removeOne(_id));
    }

    useEffect(() => () => debouncedChangeHandler.cancel(), [amount]);

    const changeCountHandler = ({ id, type }: ChangeAmountType) => {
        if (typeof changeCount === 'number') {
           switch (type) {
               case 'inc':
                setChangeCount(prev => {
                     let count =  prev + 1 
                     debouncedChangeHandler({ id, type,count })  
                     return count
                   });
                    break;
               case 'dec':
                   if (!(changeCount <= 1)) {
                    setChangeCount(prev => {
                            let count =  prev - 1 
                            debouncedChangeHandler({ id, type,count })  
                            return count
                       });
                   }  
                    break;
                default : setChangeCount(amount)
            } 
        }
    }

    //console.log('coutn',count)

    /*
    const changeAmountHandler = (e: any, { id, type }: ChangeAmountType) =>
        !(amount <= 1 && type == 'dec') && dispatch(changeAmount({ id, type}))
    */
    //const debouncedChangeHandler = useMemo(() => debounce(changeAmountHandler, 500),[amount])  
    //e => debouncedChangeHandler(e, {id: _id, type:"dec"})
    //(e)=> debouncedChangeHandler(e, {id: _id, type:"inc"})

    return (
        <div className="cart__item">
            <div className="cart__item__img-wrap">
                <img src={product.images.imageUrl} alt={product.name}/>
            </div>
            <div className="cart__item__middle">
                <div className="cart__item__title">{product.name}</div>
                <div className="cart__item__count-option">
                    <div className={changeCount <= 1 ? "cart__item__disable" : "cart__item__decriment"} onClick={e => changeCountHandler({id: _id, type:"dec"})}>
                        <img src={require("../../assets/i/minus.svg").default} alt="минус"/>
                    </div>
                    <div className="cart__item__count">{changeCount}</div>
                    <div className="cart__item__increment" onClick={(e)=> changeCountHandler({id: _id, type:"inc"})}>
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