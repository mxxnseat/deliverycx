import { ChangeEvent, FC } from "react";
import { FormikHandlers } from "formik";

interface IProps{
    handleChange: (e:ChangeEvent)=>void,
    value: boolean
}

const Checkbox: FC<IProps> = ({value, handleChange}) => {
    return (
        <label className="custom_checkbox">
            <input type="checkbox" name="notCall" checked={value} onChange={handleChange} />
            <span></span>
            <b>Не перезванивать</b>, для подтверждения моего заказа.
        </label>
    )
}

export default Checkbox;