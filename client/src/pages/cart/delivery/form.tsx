import { FC, useEffect, useMemo, useState } from "react";
import CartSelect from "../../../components/HOC/CartSelect";
import FormFieldWrapper from "../../../components/HOC/FormFieldWrapper";
import { Formik, Form } from "formik";
import InputMask from "react-input-mask";
import submitHandler from "../../../helpers/submitFormHandler";
import schema from "../../../helpers/validationSchema";
import Checkbox from "../../../components/HOC/Checkbox";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from 'semantic-ui-react'
import { withYMaps, YMaps } from "react-yandex-maps";
import MapSuggestComponent from "../MapSuggest";
import { debounce } from "lodash";
import { clearCartAction } from "../../../store/actions/cart";


interface IInitialValues {
    comment: string,
    name: string,
    address: string,
    phone: string,
    notCall: boolean
}
export interface ISubmitData extends IInitialValues {
    payment: any,
    times: object,
}

const CartForm: FC = () => {
    const { isVerify, ...user } = useSelector((state: RootState) => state.profile);
    const dispatch = useDispatch()
    const initialValues: IInitialValues = {
        comment: '',
        name: isVerify ? user.name : '',
        address: '',
        phone: isVerify ? user.phone : '',
        notCall: false
    }

    //mocki array
    const paymentMethods: any = [{
        id: "3",
        value: "Картой курьеру"
    }, {
        id: "4",
        value: "Наличными курьеру"
    }];
    const timesArray: object[] = [{
        id: "1",
        value: "По готовности"
    }];

    const [payment, setPayment] = useState(paymentMethods[0]);
    const [times, setTimes] = useState<object>(timesArray[0]);

    /* баг с падением
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=f5bd494f-4a11-4375-be30-1d2d48d88e93";
        script.async = true;
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        }
    }, []);
    */


    const SuggestComponent = useMemo(() => {
        return withYMaps(MapSuggestComponent, true, [
            "SuggestView",
            "geocode",
            "coordSystem.geo"
        ]);
    }, []);

    const debounceClearHandler = debounce(()=>{
        dispatch(clearCartAction())
    }, 400);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values, meta) => {
                submitHandler<ISubmitData>({
                    ...values,
                    payment,
                    times
                }, meta)
            }}
        >
            {
                (formik) => {
                    return (
                        <Form>
                            <div className="container">
                                <div className="cart__form">
                                    <FormFieldWrapper
                                        placeholderIco={require("../../../assets/i/card-red.svg").default}
                                        placeholderValue="Оплата">
                                        <CartSelect options={paymentMethods} selected={payment} setter={(payment: any) => setPayment(payment)} />
                                    </FormFieldWrapper>

                                    <FormFieldWrapper
                                        placeholderIco={require("../../../assets/i/mark-red.svg").default}
                                        placeholderValue="Где"
                                        isValid={!formik.values.address.length || formik.errors.address ? true : false}
                                        error={formik.errors.address ? true : false}
                                        errorValue={formik.errors.address}
                                    >

                                        {/* <CartSelect options={timesArray} selected={times} setter={(time: object) => setTimes(time)} /> */}
                                        <YMaps
                                            enterprise
                                            query={{ apikey: "f5bd494f-4a11-4375-be30-1d2d48d88e93" }}
                                        >
                                            <SuggestComponent handl={formik.handleChange} />
                                        </YMaps>


                                    </FormFieldWrapper>

                                    <FormFieldWrapper
                                        placeholderIco={require("../../../assets/i/clock.svg").default}
                                        placeholderValue="Когда"
                                    >
                                        <CartSelect options={timesArray} selected={times} setter={(time: object) => setTimes(time)} />

                                    </FormFieldWrapper>

                                    <FormFieldWrapper
                                        placeholderIco={require("../../../assets/i/profile-red.svg").default}
                                        placeholderValue="Имя"
                                        isValid={!formik.values.name.length || formik.errors.name ? true : false}
                                        error={formik.errors.name ? true : false}
                                        errorValue={formik.errors.name}
                                    >
                                        <input className="form__field-wrapper__input" name="name" placeholder="Укажу позже" value={formik.values.name} onChange={formik.handleChange} />
                                    </FormFieldWrapper>

                                    <FormFieldWrapper
                                        placeholderIco={require("../../../assets/i/phone-red.svg").default}
                                        placeholderValue="Телефон"
                                        isValid={!formik.values.phone.length || formik.errors.phone ? true : false}
                                        error={formik.errors.phone ? true : false}
                                        errorValue={formik.errors.phone}
                                    >
                                        <InputMask mask="+7 999 999 99 99" maskPlaceholder={null} name="phone" className="form__field-wrapper__input" placeholder="Укажу позже" value={formik.values.phone} onChange={formik.handleChange} />
                                    </FormFieldWrapper>

                                    <Checkbox value={formik.values.notCall} handleChange={formik.handleChange} />

                                    <textarea value={formik.values.comment} name="comment" onChange={formik.handleChange} className="form__textarea" placeholder="Напишите сюда, если хотите добавить еще какую-то информацию о заказе..."></textarea>

                                    <div className="row align-center">
                                        <div className="clear" onClick={debounceClearHandler}>
                                            <img src={require("../../../assets/i/clear_cart.svg").default} alt="Очистить корзину" />
                                        </div>
                                        <button type="submit" className="cart__order-btn btn">Заказать</button>

                                    </div>
                                </div>

                            </div>
                        </Form>
                    )
                }
            }
        </Formik>
    );
}


export default CartForm;