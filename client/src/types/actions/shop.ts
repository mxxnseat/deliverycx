import { ICategory, IProduct } from "../responses";

export enum ACTIONS{
    SET_IS_SEARCH = "SET_IS_SEARCH",
    SET_CATEGORY = "SET_CATEGORY",
    SET_PRODUCTS = "SET_PRODUCTS"
}

export interface ISetIsSearchAction{
    type: ACTIONS.SET_IS_SEARCH,
    payload: boolean
}
export interface ISetCategory{
    type: ACTIONS.SET_CATEGORY,
    payload: ICategory
}
export interface IInitialState{
    isSearch: boolean,
    category: ICategory | null
}


export type ActionsTypes = ISetIsSearchAction | ISetCategory;