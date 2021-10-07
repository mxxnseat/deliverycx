import { AppDispatch, RootState } from "..";
import { ACTIONS, IFavoritesAction, ISetIsSearchAction } from "../../types/actions/shop";
import { ICategory } from "../../types/responses";


function isSearchAction(payload: boolean): ISetIsSearchAction {
    return {
        type: ACTIONS.SET_IS_SEARCH,
        payload
    }
}
function setCategoryAction(category: ICategory) {
    console.log(category);
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

function FavoritesAction(productId: string,active:boolean) {
    return async (dispatch: AppDispatch) => {
        try {
            // тут мб запрос к базе
            active
                ? dispatch({
                    type: ACTIONS.REMOVE_FAVORITES,
                    payload: productId
                })
                : dispatch({
                    type: ACTIONS.SET_FAVORITES,
                    payload: productId
                })
            
        } catch (error) {
            console.log(error)
        }
    }
}

export {
    isSearchAction,
    setCategoryAction,
    FavoritesAction,
    loadFavorites
}