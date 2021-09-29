import { AppDispatch, RootState } from "..";
import { ICartChoiceAction, CART_CHOICE, ACTIONS, IChangePromocodeAction, ILoadCartAction, AddToCartResponse, ITotalPriceAction, ChangeAmountType, ICheckOutCartSuccess } from "../../types/actions/cart";
import { ICart, ICheckOUT, IProduct, IRemoveCartItemResponse, ISuccessCheckOut } from "../../types/responses";
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


function loadCart(payload: ICart[]): ILoadCartAction {
    return {
        type: ACTIONS.LOAD_CART,
        payload
    }
}

function checkouCartSuccess(payload:ISuccessCheckOut): ICheckOutCartSuccess {
    return {
        type: ACTIONS.CHECKOUT_CART_SUCCESS,
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
function removeOne(cartId: string) {
    return async (dispatch: AppDispatch) => {
        const { data, status } = await cart.removeOne<IRemoveCartItemResponse>(cartId)

        if (status === 200) {
            dispatch({
                type: ACTIONS.REMOVE_ITEM,
                payload: cartId
            })
        }

    }
}
function setTotalPrice() {

    return async (dispatch: AppDispatch) => {
        const { status, data } = await cart.getCart();
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
            const { status, data } = await cart.changeAmount<AddToCartResponse>(id, type);
                
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
function checkOut(data: ICheckOUT) : any { //ICheckOutCartAction
    return async (dispatch: AppDispatch) => {
        try {
            //const { status } = await cart.checkOutCart(data)
            
                dispatch(checkouCartSuccess({
                    succsess: true,
                    number_check: 213124
                }))
                
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
    setTotalPrice,
    changeAmount,
    checkOut,
    checkouCartSuccess
}