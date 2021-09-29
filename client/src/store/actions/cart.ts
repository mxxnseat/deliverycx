import { AppDispatch, RootState } from "..";
import { IСhangeCart, ICartChoiceAction, CART_CHOICE, ACTIONS, IChangePromocodeAction, ITotalPriceAction, ChangeAmountType } from "../../types/actions/cart";
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


function loadCart(payload: ICart): IСhangeCart {
    return {
        type: ACTIONS.LOAD_CART,
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
function setTotalPrice() {

    return async (dispatch: AppDispatch) => {
        const { status, data } = await cart.getCart<ICart>();
        if (status === 200) {
            dispatch({
                type: ACTIONS.TOTAL_PRICE,
                payload: data.totalPrice
            })
        }
    }
}

function changeAmount({id, type}: ChangeAmountType){
    return async(dispatch: AppDispatch)=>{
        
        try {
            const { status, data } = await cart.changeAmount<ICart>(id, type);
                
                if (status === 200) {
                    
                    dispatch({
                        type: ACTIONS.CHANGE_AMOUNT,
                        payload: data
                    })
                    
                }
        } catch (error) {
            console.log(error)
        }
    }
}

export {
    cartChoiceAction,
    changePromoCode,
    addToCartAction,
    loadCart,
    removeOne,
    setTotalPrice,
    changeAmount
}