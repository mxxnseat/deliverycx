import { ACTIONS, IInitialState, CART_CHOICE, CartActionsType} from "../../types/actions/cart";



const initialState: IInitialState = {
    promocode: '',
    cart_choice: CART_CHOICE.DELIVERY
};

export default (state = initialState, action:CartActionsType):IInitialState => {
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
        default: {
            return state;
        }
    }
}