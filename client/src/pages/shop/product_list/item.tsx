import { FC, memo, MouseEvent, useCallback, useRef, useState } from "react";
import { useHistory } from "react-router";
import AddToCart from "../../../components/AddToCart";
import convertWeight from "../../../helpers/convertWeight";
import { IProduct } from "../../../types/responses";


const Product: FC<IProduct> = ({ id, name, price, measureUnit, weight, description, image }) => {
    const history = useHistory();
    const cardRef = useRef<HTMLDivElement>(null);

    const clickHandler = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
        if (e.target === cardRef.current) {
            history.push(`/shop/product/${id}`)
        }

    }

    return (
        <div ref={cardRef} className="product__item" onClick={clickHandler}>
            <div className="product__item__img-wrap">
                <img src={image} alt={name} />
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

                    <AddToCart id={id} />
                </div>
            </div>
        </div>
    )
};

export default Product;