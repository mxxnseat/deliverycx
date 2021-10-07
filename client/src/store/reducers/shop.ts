import { IInitialState, ACTIONS, ActionsTypes } from "../../types/actions/shop";
import { ICategory } from "../../types/responses";

const initialState: IInitialState = {
    isSearch: false,
    category: null,
    favorites: {
        list:[]
    }
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
        case ACTIONS.GET_FAVORITES: {
            
            return {
                ...state,
                favorites: {
                    ...state.favorites,
                    list:action.payload as []
                }
            }
        } 
        case ACTIONS.SET_FAVORITES: {
            const list = new Set([...state.favorites.list,action.payload]) as any
            return {
                ...state,
                favorites: {
                    list:[...list]
                }
            }
        } 
        case ACTIONS.REMOVE_FAVORITES: {
            const list = state.favorites.list.filter(item => item !== action.payload)
            return {
                ...state,
                favorites: {
                    list:[...list]
                }
            }
        }    
        default: return state;
    }
}