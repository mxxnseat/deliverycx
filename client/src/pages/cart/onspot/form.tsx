import { FC, FormEvent, useState } from "react";
import CartSelect from "../../../components/HOC/CartSelect";
import FormFieldWrapper from "../../../components/HOC/FormFieldWrapper";
import { Form, Formik, useFormik } from "formik";
import submitHandler from "../../../helpers/submitFormHandler";


interface IInitialValues{
    comment: string,
}
interface ISubmitData extends IInitialValues{
    payment: any,
    address: object,
}
const initialValues: IInitialValues = {
    comment: ''
}

const CartForm: FC = () => {

    //mocki array
    const paymentMethods: any = [{
        id: "1",
        value: "Картой"
    }, {
        id: "2",
        value: "Наличными"
    }];
    const adressesMocki: any = [
        {
            id: "1",
            value: "г. Cимферополь",
            adress: "павленко 123123"
        },
        {
            id: "2",
            value: "г. Cимферополь",
            adress: "турецкая 123123"
        },
    ]

    const [payment, setPayment] = useState(paymentMethods[0]);
    const [address, setAdress] = useState<object>({ ...computedAdress(adressesMocki[0]) });
    function computedAdress(address: any) {
        return {
            id: address.id,
            value: `${address.value}\n${address.adress}`
        }
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, meta)=>{
                submitHandler<ISubmitData>({
                    ...values,
                    payment,
                    address,
                }, meta)
            }}
        >
            {
                (formik) => (
                    <Form>
                        <div className="cart__form">
                            <div className="cart__form__table">
                                <div className="cart__form__table__title">Ваш столик QR-код</div>
                                <div className="cart__form__table__value">Без столика</div>
                                <div className="cart__form__table__qrcode">
                                    <img src={require("../../../assets/img/qrcode.png").default} alt="qrcode" />
                                </div>
                            </div>

                            <FormFieldWrapper
                                placeholderIco={require("../../../assets/i/card-red.svg").default}
                                placeholderValue="Оплата"
                            >

                                <CartSelect options={paymentMethods} selected={payment} setter={(payment: any) => setPayment(payment)} />
                            </FormFieldWrapper>
                            <FormFieldWrapper
                                placeholderIco={require("../../../assets/i/mark-red.svg").default}
                                placeholderValue="Заведение"
                            >
                                <CartSelect options={adressesMocki} selected={address} setter={(address: any) => setAdress({ ...computedAdress(address) })} />
                            </FormFieldWrapper>

                            <textarea value={formik.values.comment} name="comment" onChange={formik.handleChange} className="form__textarea" placeholder="Напишите сюда, если хотите добавить еще какую-то информацию о заказе..."></textarea>

                            <button className="cart__order-btn btn">Заказать</button>
                        </div>
                    </Form>
                )
            }

        </Formik>

    );
}


export default CartForm;