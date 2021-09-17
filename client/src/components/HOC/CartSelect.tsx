import { FC, RefObject, useRef, useState } from "react"
import cn from "classnames";
import { useOutside } from "../../customHooks/useOutside";

interface ICartSelectProps<T>{
    options: T[],
    selected: T,
    setter: (payment:T)=>void
}
type ICard = {
    id: string,
    value: string
}   

const CartSelect: FC<ICartSelectProps<any>> = ({ options, selected, setter }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef() as RefObject<HTMLDivElement> | null;

    const dynamycCN = (value: string)=>cn(value, {open: isOpen});

    const openToggle = ()=>{
        setIsOpen(isOpen ? false : true);
    }
    const valueClickHandler = (option: ICard)=>{
        setter(option);
        openToggle();
    }

    useOutside(ref, openToggle, isOpen);

    return (
        <div className="form__field__type" onClick={openToggle} ref={ref}>
            <div className="form__field__value">
                {
                    selected.value
                }
            </div>
            <div className={dynamycCN("form__field__values")}>
                {
                    options.map(option => {
                        const CN = cn("form__field__values__item", {active: selected.id === option.id})

                        return <div onClick={() => valueClickHandler(option)} key={option.id} className={CN}>{option.value}</div>
                    })
                }
            </div>
            <div className={dynamycCN("form__field__open")}>
                <img src={require("../../assets/i/angle.svg").default} alt="стрелка" />
            </div>
        </div>
    )
}

export default CartSelect;