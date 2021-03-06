import { ICart, ICartProducts, ICheckOUT, IErrors, CheckoutResponseType, IProduct, CheckoutSuccessResponseType } from "../responses";

export interface ICartChoiceAction{
    type: ACTIONS.CHANGE_CHOICE,
    payload: keyof typeof CART_CHOICE
}
export interface IChangePromocodeAction{
    type: ACTIONS.CHANGE_PROMO_CODE,
    payload: string
}
export interface ISetIsLoadingAction{
    type: ACTIONS.SET_IS_LOADING,
    payload: boolean
}
export interface ITotalPriceAction{
    type: ACTIONS.TOTAL_PRICE,
    payload: number
}

export interface IСhangeCart<T = ICart>{
    type: "LOAD_CART" | "REMOVE_ITEM" | "CHANGE_AMOUNT" | "ADD_TO_CART" | "CLEAR_CART",
    payload: T
}
export interface ISetErrors{
    type: ACTIONS.SET_ERRORS,
    payload: IErrors
}
export type ChangeAmountType = {
    id: string,
    type: "inc" | "dec",
    code: string,
    count?:number
}
export interface ICheckOutCartSuccess{
    type: ACTIONS.CHECKOUT_CART_SUCCESS,
    payload: CheckoutSuccessResponseType
}
export enum CART_CHOICE{
    PICKUP = "PICKUP",
    DELIVERY = "DELIVERY",
    ONSPOT = "ONSPOT"
}
export enum ACTIONS{
    CHANGE_PROMO_CODE = "CHANGE_PROMO_CODE",
    CHANGE_CHOICE = "CHANGE_CHOICE",
    CHECKOUT_CART = "CHECKOUT_CART",
    CHECKOUT_CART_SUCCESS = "CHECKOUT_CART_SUCCESS",
    SET_IS_LOADING = "SET_IS_LOADING",
    ADD_TO_CART = "ADD_TO_CART",
    LOAD_CART = "LOAD_CART",
    REMOVE_ITEM = "REMOVE_ITEM",
    TOTAL_PRICE = "TOTAL_PRICE",
    CHANGE_AMOUNT = "CHANGE_AMOUNT",
    CLEAR_CART = "CLEAR_CART",
    SET_ERRORS = "SET_ERRORS",
    SET_COUNT = "SET_COUNT"
}


export interface IInitialState {
    promocode: string,
    cart_choice: keyof typeof CART_CHOICE,
    list: ICartProducts[],
    totalPrice: number,
    checkout: CheckoutSuccessResponseType,
    errors: IErrors,
}
export type CartActionsType =   ICartChoiceAction |
                                IChangePromocodeAction |
                                ISetIsLoadingAction |
                                IСhangeCart |
                                ITotalPriceAction |
                                ICheckOutCartSuccess |
                                ISetErrors;
