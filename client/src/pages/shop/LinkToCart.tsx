import { FC, memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../store";
import cn from "classnames";
import { useOutside } from "../../customHooks/useOutside";
import { useDeepCompareEffect } from "../../customHooks/useDeepCompareEffect";

const LinkToCart: FC = () => {
    const history = useHistory();
    const cartList = useSelector((state: RootState)=>state.cart.list);
    const [isPopupEmpty, setIsPopupEmpty] = useState(false);
    const [itemsCount, setItemsCount] = useState(0);
    const ref = useRef<HTMLDivElement | null>(null);

    const emptyCN = cn("link-to-cart", {open: isPopupEmpty});

    const linkHandler = () => {
        itemsCount ? history.push("/cart") : setIsPopupEmpty(true);
    }
    useOutside(ref, ()=>setIsPopupEmpty(false), isPopupEmpty);
    useDeepCompareEffect(()=>{
        setItemsCount(cartList.reduce((acc, el)=>{
            return acc+el.amount;
        },0));
    }, [cartList]);

    return (
        <div onClick={linkHandler} className={emptyCN}>
            <div className="container row justify-between align-center">
                <div className="link-to-cart__count">
                    {itemsCount}
                </div>

                <div className="link-to-cart__text">
                    блюда ожидают оплаты
                </div>

                {/* <div className="link-to-cart__booking"></div> */}

                <div className="link-to-cart__empty" ref={ref}>
                        <h1>
                            Вы еще ничего<br/> <span className="select-red">не заказали</span>
                        </h1>
                        <p>
                            а мы, между прочим,<br/>
                            только что хинкали сварили.
                        </p>
                </div>
            </div>
        </div>
    )
}

export default memo(LinkToCart);