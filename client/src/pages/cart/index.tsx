import { ComponentClass, FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HeaderBack from "../../components/HOC/HeaderBack";
import CartChoise from "./CartChoice";
import CartWrapper from "./CartWrapper";

import { DeliveryForm, DeliveryMemo } from "./delivery";
import { OnSpotForm, OnSpotMemo } from "./onspot";
import { PickupForm, PickupMemo } from "./pickup";

import { RootState } from "../../store";
import { CART_CHOICE } from "../../types/actions/cart";
import { useHistory } from "react-router-dom";
import CheckOut from "./CheckOut";
import { checkoutCartSuccess, setErrors } from "../../store/actions/cart";


const Cart: FC = () => {
    const history = useHistory();
    const { cart_choice, list, checkout } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch()
    
    const [CartWrapperProps, setCartWrapperProps] = useState<{Memo: FC, Form: FC | ComponentClass<any, any>}>({
        Memo: DeliveryMemo,
        Form: DeliveryForm
    });
    const [popCheckout,setPopCheckout] = useState(false)

    useEffect(() => {
        switch (cart_choice) {
            case CART_CHOICE.DELIVERY: {
                setCartWrapperProps({
                    Memo: DeliveryMemo,
                    Form: DeliveryForm
                })
                break;
            }
            case CART_CHOICE.ONSPOT: {
                setCartWrapperProps({
                    Memo: OnSpotMemo,
                    Form: OnSpotForm
                })
                break;
            }
            case CART_CHOICE.PICKUP: {
                setCartWrapperProps({ 
                    Memo: PickupMemo,
                    Form: PickupForm
                })
                break;
            }
        }
    }, [cart_choice]);

    useEffect(() => {
        checkout.success && setPopCheckout(true)
    }, [checkout.success])
    
    const handleBacktoShop = () => {
        dispatch(checkoutCartSuccess({
            success: false,
            orderNumber: 0,
        }))
        dispatch(setErrors({}));
        history.push("/shop")
    }


    return (
        <div className="cat_app" style={{ backgroundColor: "#fff" }}>
            <div className="cart">
                {
                    popCheckout
                    ?
                    <>   
                        <HeaderBack onClickCb={handleBacktoShop}>
                            Вернутся в магазин
                        </HeaderBack>
                        <CheckOut />  
                    </> 
                    :
                    <> 
                        <HeaderBack onClickCb={()=>{
                            dispatch(setErrors({}));
                            history.push("/shop")
                        }}>
                            Ваш заказ <span className="select-red">{list.length}</span> блюд
                        </HeaderBack>        
                        <div className="container">
                        <CartChoise />
                        </div>
                        <CartWrapper {...CartWrapperProps} />
                    </>
                }
                

                

            </div>
        </div>
    );
}

export default Cart;