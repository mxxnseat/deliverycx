import { FC, useState } from "react";
import CartSelect from "../../../components/HOC/CartSelect";
import FormFieldWrapper from "../../../components/HOC/FormFieldWrapper";
import { Formik, Form, Field, useFormik, FormikProvider } from "formik";
import InputMask from "react-input-mask";
import submitHandler from "../../../helpers/submitFormHandler";
import schema from "../../../helpers/validationSchema";
import Checkbox from "../../../components/HOC/Checkbox";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { withYMaps, YMaps, Map, SearchControl, Placemark } from "react-yandex-maps";
import MapSuggestComponent from "../MapSuggest";
import { debounce } from "lodash";
import { clearCartAction } from "../../../store/actions/cart";
import axios from "axios";
import { IGeoCodeResponse } from "../../../types/responses";


interface IInitialValues {
    comment: string,
    name: string,
    phone: string,
    address: string,
    flat: string,
    intercom: string,
    entrance: string,
    floor: string,
    notCall: boolean
}
export interface ISubmitData extends IInitialValues {
    payment: any,
    times: object,
    city: string
}

const placeMarkOption = {
    iconLayout: 'default#image',
    iconImageHref: require("../../../assets/i/map_placemark.png").default,
    iconImageSize: [50, 60],
    iconImageOffset: [-25, -60]
}

const CartForm: FC = () => {
    const { isVerify, ...user } = useSelector((state: RootState) => state.profile);
    const { latitude, longitude, city } = useSelector((state: RootState) => state.address.address);
    const errors = useSelector((state: RootState)=>state.cart.errors);
    const dispatch = useDispatch();
    const [openAddressSelect, setOpenAddressSelect] = useState(false);
    const [cord, setCord] = useState([]);

    const initialValues: IInitialValues = {
        comment: '',
        address: '',
        flat: '',
        intercom: '',
        entrance: '',
        floor: '',
        name: isVerify ? user.name : '',
        phone: isVerify ? user.phone : '',
        notCall: false
    }

    //mocki array
    const paymentMethods: any = [{
        id: "4",
        value: "Наличными курьеру"
    }];
    const timesArray: object[] = [{
        id: "1",
        value: "По готовности"
    }];

    const [payment, setPayment] = useState(paymentMethods[0]);
    const [times, setTimes] = useState<object>(timesArray[0]);

    const debounceClearHandler = debounce(() => {
        dispatch(clearCartAction())
    }, 400);

    const onMapClick = (e: any) => {
        const cords = e.get("coords");
        setCord(cords);
        axios.get<IGeoCodeResponse>(
            `https://geocode-maps.yandex.ru/1.x/?geocode=${cords.reverse()}&format=json&apikey=f5bd494f-4a11-4375-be30-1d2d48d88e93`
        ).then(({ data }) => {
            formik.setFieldValue("address", data.response.GeoObjectCollection.featureMember[0].GeoObject.name);
        })
    }

    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: (values, meta) => {
            submitHandler<ISubmitData>({
                ...values,
                payment,
                times,
                city: city.name
            }, meta)
        }
    })

    if (openAddressSelect) {

        return <div className="address-select-map">
            <YMaps
                enterprise
                query={{ apikey: "f5bd494f-4a11-4375-be30-1d2d48d88e93" }}
            >
                <Map width="100%" height="100%" onClick={onMapClick} defaultState={
                    {
                        center: [latitude, longitude],
                        zoom: 17,
                        controls: [],
                        scrollZoom: false
                    }
                }>

                    <SearchControl options={{ float: 'right' }} />

                    <Placemark
                        options={placeMarkOption}
                        geometry={cord}
                    />
                </Map>
            </YMaps>

            {
                formik.values.address && <button className="btn" onClick={() => setOpenAddressSelect(false)}>{formik.values.address}</button>

            }
        </div>
    }

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <div className="cart__form">
                    {/* <FormFieldWrapper
                        placeholderIco={require("../../../assets/i/card-red.svg").default}
                        placeholderValue="Оплата">
                        <CartSelect options={paymentMethods} selected={payment} setter={(payment: any) => setPayment(payment)} />
                    </FormFieldWrapper> */}
                    <div className="adress_fild">
                        <FormFieldWrapper
                            placeholderIco={require("../../../assets/i/mark-red.svg").default}
                            placeholderValue="Где"
                            isValid={!formik.values.address.length || formik.errors.address ? true : false}
                            error={formik.errors.address ? true : false}
                            errorValue={formik.errors.address}
                        >
                            <div className="adress_fild__address" onClick={() => setOpenAddressSelect(true)}>
                                {formik.values.address}
                            </div>


                        </FormFieldWrapper>
                        <div className="row justify-around">
                            <Field className="form__field-wrapper__input gray" name="flat" placeholder="Кв./Офис" value={formik.values.flat} onChange={formik.handleChange} />
                            <Field className="form__field-wrapper__input gray" name="intercom" placeholder="Домофон" value={formik.values.intercom} onChange={formik.handleChange} />
                            <Field className="form__field-wrapper__input gray" name="entrance" placeholder="Подъезд" value={formik.values.entrance} onChange={formik.handleChange} />
                            <Field className="form__field-wrapper__input gray" name="floor" placeholder="Этаж" value={formik.values.floor} onChange={formik.handleChange} />
                        </div>
                    </div>
                    {/* <FormFieldWrapper
                        placeholderIco={require("../../../assets/i/clock.svg").default}
                        placeholderValue="Когда"
                    >
                        <CartSelect options={timesArray} selected={times} setter={(time: object) => setTimes(time)} />

                    </FormFieldWrapper> */}

                    <FormFieldWrapper
                        placeholderIco={require("../../../assets/i/profile-red.svg").default}
                        placeholderValue="Имя"
                        isValid={!formik.values.name.length || formik.errors.name ? true : false}
                        error={formik.errors.name && formik.touched.name ? true : false}
                        errorValue={formik.errors.name}
                    >

                        <Field className="form__field-wrapper__input" name="name" placeholder="Ваше имя" value={formik.values.name} onChange={formik.handleChange} />

                    </FormFieldWrapper>

                    <FormFieldWrapper
                        placeholderIco={require("../../../assets/i/phone-red.svg").default}
                        placeholderValue="Телефон"
                        isValid={!formik.values.phone.length || formik.errors.phone ? true : false}
                        error={formik.errors.phone && formik.touched.phone ? true : false}
                        errorValue={formik.errors.phone}
                    >
                        <Field name="phone" render={({ field }: any) => (
                            <InputMask {...field} mask="+7 999 999 99 99" maskPlaceholder={null} className="form__field-wrapper__input" placeholder="Ваш телефон" value={formik.values.phone} onChange={formik.handleChange} />
                        )} />
                        {console.log(formik.touched)}
                    </FormFieldWrapper>

                    {/* <Checkbox value={formik.values.notCall} handleChange={formik.handleChange} /> */}

                    <textarea value={formik.values.comment} name="comment" onChange={formik.handleChange} className="form__textarea" placeholder="Напишите сюда, если хотите добавить еще какую-то информацию о заказе..."></textarea>

                    {
                        errors["500"] && <div className="server-error">
                            Что-то пошло не так. Для подтверждения Вашего заказа, пожалуйста <b>нажмите кнопку «Заказать» еще раз.</b>
                        </div>
                    }
                    

                    <div className="row align-center form__create">
                        <div className="clear" onClick={debounceClearHandler}>
                            <img src={require("../../../assets/i/clear_cart.svg").default} alt="Очистить корзину" />
                        </div>
                        <button type="submit" className="cart__order-btn btn" disabled={formik.isSubmitting}>Заказать</button>

                    </div>
                </div>
            </form>

        </FormikProvider>
    );
}


export default CartForm;