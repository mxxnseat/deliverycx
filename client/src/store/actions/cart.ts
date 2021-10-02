import { AppDispatch, RootState } from "..";
import { IСhangeCart, ICartChoiceAction, CART_CHOICE, ACTIONS, IChangePromocodeAction, ChangeAmountType, ICheckOutCartSuccess } from "../../types/actions/cart";
import { ICart, ICheckOUT, ICheckoutResponse } from "../../types/responses";
import cart from "../../api/Cart";
import { ISubmitData } from "../../pages/cart/delivery/form";

function changePromoCode(payload: string): IChangePromocodeAction {
    return {
        type: ACTIONS.CHANGE_PROMO_CODE,
        payload
    }
}
function cartChoiceAction(payload: CART_CHOICE): ICartChoiceAction {
    return {
        type: ACTIONS.CHANGE_CHOICE,
        payload
    }
}


function loadCart(payload: ICart): IСhangeCart {
    return {
        type: ACTIONS.LOAD_CART,
        payload
    }
}

function checkoutCartSuccess(payload:ICheckoutResponse): ICheckOutCartSuccess {
    return {
        type: ACTIONS.CHECKOUT_CART_SUCCESS,
        payload
    }
}

function addToCartAction(productId: string) {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { status, data } = await cart.addToCart<ICart>(productId);

        if (status === 200) {
            dispatch({
                type: ACTIONS.ADD_TO_CART,
                payload: data
            })

        }
    }
}
function removeOne(cartId: string) {
    return async (dispatch: AppDispatch) => {
        const { data, status } = await cart.removeOne<ICart>(cartId)
        if (status === 200) {
            dispatch({
                type: ACTIONS.REMOVE_ITEM,
                payload: data
            })
        }

    }
}

function changeAmount({id, type,count}: ChangeAmountType){
    return async(dispatch: AppDispatch)=>{
        
        try {
            if (count) {
                console.log('action',count)
                const { status, data } = await cart.changeAmount<ICart>(id, type,count);
               
                if (status === 200) {
                    
                    dispatch({
                        type: ACTIONS.CHANGE_AMOUNT,
                        payload: data
                    })
                    
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
function checkOut(sendingData: ICheckOUT) : any { //ICheckOutCartAction
    return async (dispatch: AppDispatch) => {
        try {
                const { status, data } = await cart.checkOutCart<ICheckoutResponse>(sendingData);
            
                if(status === 200){
                    dispatch(checkoutCartSuccess(data))
                }
                
        } catch (error) {
            
        }
    }
}

export {
    cartChoiceAction,
    changePromoCode,
    addToCartAction,
    loadCart,
    removeOne,
    changeAmount,
    checkOut,
    checkoutCartSuccess
}