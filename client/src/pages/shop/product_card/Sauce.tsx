import { FC } from "react";
import convertWeight from "../../../helpers/convertWeight";

interface IProps{
    id: string,
    name: string,
    weight: number,
    price: number
}

const Sauce: FC<IProps> = ({id, name, weight, price}) => {
    return (
        <div className="sauce">
            <div className="sauce__name">{name}</div>
            <div className="sauce__weight">{convertWeight(weight)} г</div>
            <div className="sauce__price select-red">{price} ₽</div>
            <div className="sauce__add-btn"></div>
        </div>
    )
}

export default Sauce;