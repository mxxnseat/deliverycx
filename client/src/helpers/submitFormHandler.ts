import store from "../store";
import {changePromoCode, checkOut} from "../store/actions/cart";


const submitHandler = <T>(values: T, meta: any)=>{
    const {cart: {promocode,cart_choice,totalPrice}} = store.getState();
    store.dispatch(changePromoCode(''));
    store.dispatch(checkOut({...values,promocode,cart_choice,totalPrice})); //{...values,cart_choice,totalPrice}
}

export default submitHandler;