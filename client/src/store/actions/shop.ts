import {ACTIONS, ISetIsSearchAction} from "../../types/actions/shop";
import { AppDispatch, RootState } from "../";
import axios from "axios";
import Api from "../../api/Api";
import { ICategory, IProduct } from "../../types/responses";




function isSearchAction(payload: boolean): ISetIsSearchAction{
    return {
        type: ACTIONS.SET_IS_SEARCH,
        payload
    }
}
function setCategoryAction(category: ICategory){
    return async (dispatch: AppDispatch, getState:()=> RootState)=>{
        if(category){
            const organizationId = getState().address.address._id;
            
            const responseProducts = await Api.getProducts<IProduct[]>(category._id, organizationId);
            const products = responseProducts.data;
            dispatch({
                type: ACTIONS.SET_CATEGORY,
                payload: category
            });
            
            dispatch({
                type: ACTIONS.SET_PRODUCTS,
                payload: products
            })
        }
        
    }
}

export {
    isSearchAction,
    setCategoryAction
}