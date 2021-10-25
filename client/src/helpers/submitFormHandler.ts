import store from "../store";
import {changePromoCode, checkOut} from "../store/actions/cart";
import {FormikHelpers} from "formik";

const submitHandler = async <T>(values: T, meta: FormikHelpers<any>)=>{
    const {cart: {promocode,cart_choice,totalPrice}} = store.getState();
    meta.setSubmitting(true);
    new Promise(async (resolve, reject)=>{
        await store.dispatch(changePromoCode(''));
        await store.dispatch(checkOut({...values,promocode,cart_choice,totalPrice}));
        resolve(true);
    }).then(()=>{
        meta.setSubmitting(false);
    })
    
}

export default submitHandler;