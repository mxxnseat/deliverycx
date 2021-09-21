import { AppDispatch, RootState } from "..";
import { ICartChoiceAction, CART_CHOICE, ACTIONS, IChangePromocodeAction, IAddToCartAction, AddToCartResponse } from "../../types/actions/cart";
import { IProduct } from "../../types/responses";
import cart from "../../api/Cart";

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


function addToCartAction(productId: string) {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch({
            type: ACTIONS.SET_IS_LOADING,
            payload: true
        });
        const {status, data} = await cart.addToCart<AddToCartResponse[]>(productId);

        dispatch({
            type: ACTIONS.SET_IS_LOADING,
            payload: false
        });

        if(status === 200){
            dispatch({
                type: ACTIONS.ADD_TO_CART,
                payload: data
            })
        }
    }
}

export {
    cartChoiceAction,
    changePromoCode
}