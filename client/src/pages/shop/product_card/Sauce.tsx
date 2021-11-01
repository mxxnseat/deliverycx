import { FC } from "react";
import convertWeight from "../../../helpers/convertWeight";
import AddToCart from "../../../components/AddToCart";

interface IProps{
    id: string,
    name: string,
    weight: number,
    price: number,
    group: {image: string}
}

const Sauce: FC<IProps> = ({id, name, weight, price, group}) => {
    return (
        <div className="sauce">
            <div className="sauce__name">{name}</div>
            <div className="sauce__weight">{convertWeight(weight)} г</div>
            <div className="sauce__price select-red">{price} ₽</div>
            <AddToCart id={id} groupImage={group.image} _class="sauce__add-btn" />
        </div> 
    )
}

export default Sauce;