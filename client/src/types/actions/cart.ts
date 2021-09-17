export interface ICartChoiceAction{
    type: ACTIONS.CHANGE_CHOICE,
    payload: CART_CHOICE
}
export interface IChangePromocodeAction{
    type: ACTIONS.CHANGE_PROMO_CODE,
    payload: string
}


export enum CART_CHOICE{
    PICKUP = "PICKUP",
    DELIVERY = "DELIVERY",
    ONSPOT = "ONSPOT"
}
export enum ACTIONS{
    CHANGE_PROMO_CODE = "CHANGE_PROMO_CODE",
    CHANGE_CHOICE = "CHANGE_CHOICE"
}


export interface IInitialState {
    promocode: string,
    cart_choice: CART_CHOICE
}
export type CartActionsType = ICartChoiceAction | IChangePromocodeAction;
