import { AppDispatch, RootState } from "..";
import { IСhangeCart, ICartChoiceAction, CART_CHOICE, ACTIONS, IChangePromocodeAction, ChangeAmountType, ICheckOutCartSuccess, ISetErrors} from "../../types/actions/cart";
import { ICart, ICheckOUT, CheckoutResponseType, IErrors, CheckoutSuccessResponseType, CheckoutFailedResponseType } from "../../types/responses";
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

function checkoutCartSuccess(payload: CheckoutResponseType<{ orderNumber: number }>): ICheckOutCartSuccess {
    return {
        type: ACTIONS.CHECKOUT_CART_SUCCESS,
        payload
    }
}

function clearCartAction() {
    return async (dispatch: AppDispatch) => {
        try {
            const { status, data } = await cart.clear();

            if (status === 200) {
                dispatch({
                    type: ACTIONS.CLEAR_CART,
                    payload: {
                        products: [],
                        totalPrice: 0
                    }
                })

            }
        } catch (error) {
            console.log(error)
        }
    }
}
function addToCartAction(productId: string) {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { status, data } = await cart.addToCart<ICart>(productId);

            if (status === 200) {
                dispatch({
                    type: ACTIONS.ADD_TO_CART,
                    payload: data
                })

            }
        } catch (error) {
            console.log(error)
        }
    }
}
function removeOne(cartId: string) {
    return async (dispatch: AppDispatch) => {
        try {
            const { data, status } = await cart.removeOne<ICart>(cartId)
            if (status === 200) {
                dispatch({
                    type: ACTIONS.REMOVE_ITEM,
                    payload: data
                })
            }
        } catch (error) {
            console.log(error)
        }

    }
}

function changeAmount({ id, type, count, code }: ChangeAmountType) {
    return async (dispatch: AppDispatch, getState: ()=>RootState) => {

        try {
            if (count) {
                const { status, data } = await cart.changeAmount<ICart>(id, type, count);

                const errors = getState().cart.errors;
                const splitCode = code.replace(/\W|\d+/gi, '');

                delete errors[splitCode];
                dispatch(setErrors(errors));
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

function setErrors(errors: IErrors): ISetErrors {
    return {
        type: ACTIONS.SET_ERRORS,
        payload: errors
    }
}
function checkOut(sendingData: ICheckOUT): any { //ICheckOutCartAction
    return async (dispatch: AppDispatch) => {
        try {
            const { status, data } = await cart.checkOutCart<CheckoutResponseType<{orderNumber: number} | {errors: IErrors}>>(sendingData);
            console.log(data);
            if (data.success) {
                dispatch(checkoutCartSuccess(data as CheckoutSuccessResponseType))
            }
            
        } catch (error: any) {
            dispatch(setErrors((error.response.data as CheckoutFailedResponseType).errors))
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
    setErrors,
    checkoutCartSuccess,
    clearCartAction
}