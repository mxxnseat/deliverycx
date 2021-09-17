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
export interface ISetProductsList{
    type: ACTIONS.SET_PRODUCTS,
    payload: IProduct[]
}

export interface IInitialState{
    isSearch: boolean,
    productsList: IProduct[],
    category: ICategory
}


export type ActionsTypes = ISetIsSearchAction | ISetCategory | ISetProductsList;