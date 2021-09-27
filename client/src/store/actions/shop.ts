import { ACTIONS, ISetIsSearchAction } from "../../types/actions/shop";
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

export {
    isSearchAction,
    setCategoryAction
}