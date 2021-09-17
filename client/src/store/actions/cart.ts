import {ICartChoiceAction, CART_CHOICE, ACTIONS, IChangePromocodeAction} from "../../types/actions/cart";

function changePromoCode(payload: string): IChangePromocodeAction{
    return {
        type: ACTIONS.CHANGE_PROMO_CODE,
        payload
    }
}
function cartChoiceAction(payload: CART_CHOICE): ICartChoiceAction{
    return {
        type: ACTIONS.CHANGE_CHOICE,
        payload
    }
}

export {
    cartChoiceAction,
    changePromoCode
}