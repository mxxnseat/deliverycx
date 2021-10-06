import { FC, useState } from "react";
import CartSelect from "../../../components/HOC/CartSelect";
import FormFieldWrapper from "../../../components/HOC/FormFieldWrapper";
import { Formik, Form } from "formik";
import InputMask from "react-input-mask";
import submitHandler from "../../../helpers/submitFormHandler";
import schema from "../../../helpers/validationSchema";
import Checkbox from "../../../components/HOC/Checkbox";


interface IInitialValues{
    comment: string,
    name: string,
    address: string,
    phone: string,
    notCall: boolean
}
export interface ISubmitData extends IInitialValues{
    payment: any,
    times: object,
}

const initialValues:IInitialValues = {
    comment: '',
    name: '',
    address: '',
    phone: '',
    notCall: false
}


const CartForm: FC = () => {
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

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values, meta)=>{
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
                            <div className="cart__form">
                                <FormFieldWrapper
                                    placeholderIco={require("../../../assets/i/card-red.svg").default}
                                    placeholderValue="Оплата">
                                    <CartSelect options={paymentMethods} selected={payment} setter={(payment: any) => setPayment(payment)} />
                                </FormFieldWrapper>

                                <FormFieldWrapper
                                    placeholderIco={require("../../../assets/i/mark-red.svg").default}
                                    placeholderValue="Где"
                                >
                                    <input 
                                        className="form__field-wrapper__input"
                                        name="address"
                                        placeholder="Укажу позже"
                                        value={formik.values.address}
                                        onChange={formik.handleChange} 
                                    />
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

                                <button type="submit" className="cart__order-btn btn">Заказать</button>
                            </div>
                        </Form>
                    )
                }
            }
        </Formik>
    );
}


export default CartForm;