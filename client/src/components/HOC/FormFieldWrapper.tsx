import cn from "classnames";
import { FC } from "react";

interface IProps{
    placeholderIco: string,
    placeholderValue: string,
    isValid?: boolean,
    error?: boolean,
    errorValue?: string
}

const FormFieldWrapper: FC<IProps> = ({ placeholderIco, placeholderValue, children, isValid, error,errorValue }) => {
    const validCN = cn("form__field-wrapper", {
        "not-valid": isValid !== undefined ? isValid : false,
        "error": error !== undefined ? error : false
    });
    return (
        <div className={validCN}>
            <div className="row">
                <div className="form__field-wrapper__placeholder">
                    <div className="form__field-wrapper__placeholder__ico">
                        <img src={placeholderIco} alt="" />
                    </div>
                    <div className="form__field-wrapper__placeholder__title">{placeholderValue}</div>
                </div>

                {children}
            </div>
            
            <div className="form__field-wrapper__error">
                {errorValue}
            </div>
        </div>
    )
}

export default FormFieldWrapper;