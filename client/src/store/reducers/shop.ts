import { IInitialState, ACTIONS, ActionsTypes } from "../../types/actions/shop";
import { ICategory } from "../../types/responses";

const initialState: IInitialState = {
    isSearch: false,
    category: {} as ICategory
}

export default (state = initialState, action: ActionsTypes):IInitialState=>{
    switch(action.type){
        case ACTIONS.SET_CATEGORY: {
            return {
                ...state,
                category: action.payload
            }
        }
        case ACTIONS.SET_IS_SEARCH: {
            return {
                ...state,
                isSearch: action.payload
            }
        }
        default: return state;
    }
}