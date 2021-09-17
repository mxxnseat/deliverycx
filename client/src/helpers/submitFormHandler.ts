import store from "../store";
import {changePromoCode} from "../store/actions/cart";


const submitHandler = <T>(values: T, meta: any)=>{
    const {cart: {promocode}} = store.getState();

    store.dispatch(changePromoCode(''));
    meta.resetForm();
}

export default submitHandler;