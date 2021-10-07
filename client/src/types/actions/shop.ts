import { ICategory, IFavorites, IProduct } from "../responses";

export enum ACTIONS{
    SET_IS_SEARCH = "SET_IS_SEARCH",
    SET_CATEGORY = "SET_CATEGORY",
    SET_PRODUCTS = "SET_PRODUCTS",
    SET_FAVORITES = "SET_FAVORITES",
    REMOVE_FAVORITES = "REMOVE_FAVORITES",
    GET_FAVORITES = "GET_FAVORITES"
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
    category: ICategory | null,
    favorites: IFavorites
}
export interface IFavoritesAction<T>{
    type: ACTIONS.SET_FAVORITES | ACTIONS.REMOVE_FAVORITES | ACTIONS.GET_FAVORITES,
    payload: T
}


export type ActionsTypes = ISetIsSearchAction | ISetCategory | IFavoritesAction<string | string[]>;