import { AppDispatch, RootState } from "..";
import { ACTIONS, IFavoritesAction, ISetIsSearchAction } from "../../types/actions/shop";
import { ICategory } from "../../types/responses";
import profile from '../../api/Profile';
import FavoritesApi from "../../api/FavoritesApi";

function isSearchAction(payload: boolean): ISetIsSearchAction {
    return {
        type: ACTIONS.SET_IS_SEARCH,
        payload
    }
}
function setCategoryAction(category: ICategory) {
    return {
        type: ACTIONS.SET_CATEGORY,
        payload: category
    };
}

function loadFavorites(payload: string[]) : IFavoritesAction<string[]> {
    return {
        type: ACTIONS.GET_FAVORITES,
        payload
    }
}

export {
    isSearchAction,
    setCategoryAction,
    loadFavorites
}