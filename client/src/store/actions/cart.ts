import { AppDispatch, RootState } from "..";
import { ICartChoiceAction, CART_CHOICE, ACTIONS, IChangePromocodeAction, ILoadCartAction, AddToCartResponse } from "../../types/actions/cart";
import { ICart, IProduct, IRemoveCartItemResponse } from "../../types/responses";
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


function loadCart(payload: ICart[]): ILoadCartAction{
    return {
        type: ACTIONS.LOAD_CART,
        payload
    }
}
function addToCartAction(productId: string) {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch({
            type: ACTIONS.SET_IS_LOADING,
            payload: true
        });
        const { status, data } = await cart.addToCart<AddToCartResponse>(productId);
        dispatch({
            type: ACTIONS.SET_IS_LOADING,
            payload: false
        });

        if (status === 200) {
            dispatch({
                type: ACTIONS.ADD_TO_CART,
                payload: data
            })

        }
    }
}
function removeOne(cartId: string){
    return async (dispatch: AppDispatch)=>{
        const {data, status} = await cart.removeOne<IRemoveCartItemResponse>(cartId)

        if(status === 200){
            dispatch({
                type: ACTIONS.REMOVE_ITEM,
                payload: cartId
            })
        }
        
    }
}

export {
    cartChoiceAction,
    changePromoCode,
    addToCartAction,
    loadCart,
    removeOne
}