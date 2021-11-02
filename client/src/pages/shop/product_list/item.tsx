import { FC, memo, MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AddToCart from "../../../components/AddToCart";
import AddToFavorites from "../../../components/AddToFavorites";
import convertWeight from "../../../helpers/convertWeight";
import { IProduct } from "../../../types/responses";

const Product: FC<IProduct<{image: string}>> = ({ id, name, price, group, measureUnit, weight, description, image, isFav }) => {
    const history = useHistory();
    const cardRef = useRef<HTMLDivElement>(null);
    
    const clickHandler = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
        if ((e.target as HTMLButtonElement).type !== 'submit') {
            history.push(`/shop/product/${id}`)
            
            localStorage.setItem("prod", cardRef.current?.dataset.id as string)
        }
    }

    useEffect(() => {
        const id = localStorage.getItem('prod')
        new Promise((resolve, reject) => {
            if (cardRef.current?.dataset.id == id) {
                resolve(cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
            } else {
                id && reject()
            }
        })
            .then(() => localStorage.removeItem('prod'))
            .catch(() => localStorage.removeItem('prod'))
        
    },[])

    return (
        <div ref={cardRef} className="product__item" data-id={id} onClick={clickHandler}>
            <div className="product__item__img-wrap">
                <img src={image} alt={name} />
            </div>
            <div className="product__item__content">
                <div className="row justify-end">
                    {/* <div className="product__item__cooking-time">15 мин</div> */}
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
 
                    <AddToCart id={id} _class={"add-to-cart"} groupImage={group.image} />
                </div>
            </div>
        </div>   
    )
};

export default Product;