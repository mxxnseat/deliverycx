import { ICart, IProduct } from "../responses";

export interface ICartChoiceAction{
    type: ACTIONS.CHANGE_CHOICE,
    payload: CART_CHOICE
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

export type AddToCartResponse = {
    _id: string,
    product: IProduct,
    amount: number
};
export interface IAddToCartAction{
    type: ACTIONS.ADD_TO_CART,
    payload: AddToCartResponse
}

export interface ILoadCartAction{
    type: ACTIONS.LOAD_CART,
    payload: ICart[]
}
export interface IRemoveItemAction{
    type: ACTIONS.REMOVE_ITEM,
    payload: string
}
export type ChangeAmountType = {
    id: string,
    type: "inc" | "dec"
}
export interface IChangeAmountAction{
    type: ACTIONS.CHANGE_AMOUNT,
    payload: AddToCartResponse
}

export enum CART_CHOICE{
    PICKUP = "PICKUP",
    DELIVERY = "DELIVERY",
    ONSPOT = "ONSPOT"
}
export enum ACTIONS{
    CHANGE_PROMO_CODE = "CHANGE_PROMO_CODE",
    CHANGE_CHOICE = "CHANGE_CHOICE",
    SET_IS_LOADING = "SET_IS_LOADING",
    ADD_TO_CART = "ADD_TO_CART",
    LOAD_CART = "LOAD_CART",
    REMOVE_ITEM = "REMOVE_ITEM",
    TOTAL_PRICE = "TOTAL_PRICE",
    CHANGE_AMOUNT = "CHANGE_AMOUNT"
}


export interface IInitialState {
    promocode: string,
    cart_choice: CART_CHOICE,
    list: AddToCartResponse[],
    isLoading: boolean
    totalPrice: number
}
export type CartActionsType =   ICartChoiceAction |
                                IChangePromocodeAction |
                                ISetIsLoadingAction |
                                IAddToCartAction |
                                ILoadCartAction |
                                IRemoveItemAction |
                                ITotalPriceAction |
                                IChangeAmountAction;
