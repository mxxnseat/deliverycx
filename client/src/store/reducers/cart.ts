import { ACTIONS, IInitialState, CART_CHOICE, CartActionsType } from "../../types/actions/cart";



const initialState: IInitialState = {
    promocode: '',
    cart_choice: CART_CHOICE.DELIVERY,
    list: [],
    totalPrice: 0,
    checkout: {
        success: false,
        orderNumber: 0,
    }
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
        case ACTIONS.LOAD_CART: {
            return {
                ...state,
                list: action.payload.products,
                totalPrice: action.payload.totalPrice
            }
        }
        case ACTIONS.ADD_TO_CART: {
            return {
                ...state,
                list: action.payload.products,
                totalPrice: action.payload.totalPrice
            }
        }
        case ACTIONS.REMOVE_ITEM: {


            return {
                ...state,
                list: action.payload.products,
                totalPrice: action.payload.totalPrice
            }
        }
        case ACTIONS.CHANGE_AMOUNT: {
            return {
                ...state,
                list: action.payload.products,
                totalPrice: action.payload.totalPrice
            }
        }
        case ACTIONS.CHECKOUT_CART_SUCCESS: {
            return {
                ...initialState,
                checkout: action.payload
            }
        }
        default: {
            return state;
        }
    }
}