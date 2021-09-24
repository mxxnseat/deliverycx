import { FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HeaderBack from "../../components/HOC/HeaderBack";
import CartChoise from "./CartChoice";
import CartWrapper from "./CartWrapper";

import { DeliveryForm, DeliveryMemo } from "./delivery";
import { OnSpotForm, OnSpotMemo } from "./onspot";
import { PickupForm, PickupMemo } from "./pickup";

import { RootState } from "../../store";
import { CART_CHOICE } from "../../types/actions/cart";
import { useHistory } from "react-router";

import cart from "../../api/Cart";
import { setTotalPrice } from "../../store/actions/cart";


const Cart: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const activeChoice: CART_CHOICE = useSelector((state: RootState) => state.cart.cart_choice);
    const [CartWrapperProps, setCartWrapperProps] = useState({
        Memo: DeliveryMemo,
        Form: DeliveryForm
    });

    useEffect(() => {
        switch (activeChoice) {
            case CART_CHOICE.DELIVERY: {
                setCartWrapperProps({
                    ...{
                        Memo: DeliveryMemo,
                        Form: DeliveryForm
                    }
                })
                break;
            }
            case CART_CHOICE.ONSPOT: {
                setCartWrapperProps({
                    ...{
                        Memo: OnSpotMemo,
                        Form: OnSpotForm
                    }
                })
                break;
            }
            case CART_CHOICE.PICKUP: {
                setCartWrapperProps({
                    ...{
                        Memo: PickupMemo,
                        Form: PickupForm
                    }
                })
                break;
            }
        }
    }, [activeChoice]);

    return (
        <div className="app" style={{ backgroundColor: "#fff" }}>
            <div className="cart">
                <HeaderBack onClickCb={()=>history.push("/shop")}>
                        Ваш заказ <span className="select-red">7</span> блюд
                </HeaderBack>
                <div className="container">
                    <CartChoise />
                </div>
                <CartWrapper {...CartWrapperProps} />

            </div>
        </div>
    );
}

export default Cart;