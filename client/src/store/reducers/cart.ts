import { is } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import { ACTIONS, IInitialState, CART_CHOICE, CartActionsType } from "../../types/actions/cart";



const initialState: IInitialState = {
    promocode: '',
    cart_choice: CART_CHOICE.DELIVERY,
    list: [],
    isLoading: false,
    totalPrice: 0
};

export default (state = initialState, action: CartActionsType): IInitialState => {
    switch (action.type) {
        case ACTIONS.CHANGE_PROMO_CODE: {
            return {
                ...state,
                promocode: action.payload
            }
        }
        case ACTIONS.CHANGE_CHOICE: {
            return {
                ...state,
                cart_choice: action.payload
            }
        }
        case ACTIONS.SET_IS_LOADING: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case ACTIONS.LOAD_CART: {
            return {
                ...state,
                list: action.payload
            }
        }
        case ACTIONS.ADD_TO_CART: {

            const saveList = [...state.list];
            const isFind = saveList.find(el => el._id === action.payload._id);

            if (isFind) {
                isFind.amount += 1;
            } else {
                saveList.push(action.payload);
            }

            return {
                ...state,
                list: saveList
            }
        }
        case ACTIONS.REMOVE_ITEM: {
            return {
                ...state,
                list: state.list.filter(el => el._id !== action.payload)
            }
        }
        case ACTIONS.TOTAL_PRICE: {
            return {
                ...state,
                totalPrice: action.payload
            }
        }
        case ACTIONS.CHANGE_AMOUNT: {
            const saveList = [...state.list];

            const isFind = saveList.find(el => el._id === action.payload._id);
            console.log(isFind, action.payload);
            
            if (isFind !== undefined) {
                isFind.amount = action.payload.amount;

                return {
                    ...state,
                    list: saveList
                }
            }
            return state;
        }
        default: {
            return state;
        }
    }
}