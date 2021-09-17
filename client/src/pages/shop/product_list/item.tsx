import { FC, MouseEvent, useRef } from "react";
import {useHistory} from "react-router";
import convertWeight from "../../../helpers/convertWeight";
import { IProduct } from "../../../types/responses";

const Product_item: FC<IProduct> = ({_id, name, price, measureUnit, weight, description, images}) => {
    const history = useHistory();
    const cardRef = useRef<HTMLDivElement>(null);

    const clickHandler = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>)=>{
        e.stopPropagation();
        if(e.currentTarget !== cardRef.current){
            return alert("Add to cart");
        }else{
            history.push(`/shop/product/${_id}`)
        }
    }

    return (
        <div ref={cardRef} className="product__item" onClick={clickHandler}>
            <div className="product__item__img-wrap">
                <img src={images.imageUrl} alt={name} />
            </div>
            <div className="product__item__content">
                <div className="row justify-between">
                    <div className="product__item__cooking-time">15 мин</div>
                    <div className="product__item__favorite"></div>
                </div>

                <div className="product__item__title">
                   {name}
                </div>
                <div className="product__item__description">
                    {description}
                </div>
                
                <div className="row product__item__options justify-between">
                    <div>
                        <div className="product__item__measure">{measureUnit === "порц" ? "1 шт" : `${convertWeight(weight)} г`}</div>
                        <div className="product__item__price">{price} ₽</div>
                    </div>
                    <button className="add-to-cart" onClick={clickHandler}></button>
                </div>
            </div>
        </div>
    )
};

export default Product_item;