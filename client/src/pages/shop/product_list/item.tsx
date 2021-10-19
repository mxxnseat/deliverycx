import { FC, memo, MouseEvent, useCallback, useRef, useState } from "react";
import { useHistory } from "react-router";
import AddToCart from "../../../components/AddToCart";
import AddToFavorites from "../../../components/AddToFavorites";
import convertWeight from "../../../helpers/convertWeight";
import { IProduct } from "../../../types/responses";

const Product: FC<IProduct> = ({ id, name, price, measureUnit, weight, description, image, isFav }) => {
    const history = useHistory();
    const cardRef = useRef<HTMLDivElement>(null);

    const clickHandler = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {

        if ((e.target as HTMLButtonElement).type !== 'submit') {
            history.push(`/shop/product/${id}`)
        }

    }

    console.log(measureUnit);

    return (
        <div ref={cardRef} className="product__item" onClick={clickHandler}>
            <div className="product__item__img-wrap">
                <img src={image} alt={name} />
            </div>
            <div className="product__item__content">
                <div className="row justify-between">
                    <div className="product__item__cooking-time">15 мин</div>
                    <AddToFavorites _class="product__item__favorite" isFav={isFav} id={id} />
                </div>

                <div className="product__item__title">
                    {name}
                </div>
                <div className="product__item__description">
                    {description}
                </div>

                <div className="row product__item__options justify-between">
                    <div>
                        <div className="product__item__measure">{measureUnit === "порц" ? `${convertWeight(weight)} г` : "1 шт"}</div>
                        <div className="product__item__price">{price} ₽</div>
                    </div>

                    <AddToCart id={id} _class={"add-to-cart"} />
                </div>
            </div>
        </div>
    )
};

export default Product;