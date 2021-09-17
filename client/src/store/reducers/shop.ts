import { IInitialState, ACTIONS, ActionsTypes } from "../../types/actions/shop";
import { ICategory } from "../../types/responses";

const initialState: IInitialState = {
    isSearch: false,
    productsList: [],
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
        case ACTIONS.SET_PRODUCTS: {
            return {
                ...state,
                productsList: [...action.payload]
            }
        }
        default: return state;
    }
}