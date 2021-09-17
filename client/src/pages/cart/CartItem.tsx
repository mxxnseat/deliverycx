import { FC } from "react";

const CartItem: FC = ()=>{
    return (
        <div className="cart__item">
            <div className="cart__item__img-wrap">
                <img src={require("../../assets/img/test_img-product.jpg").default} alt="test" />
            </div>
            <div className="cart__item__middle">
                <div className="cart__item__title">Хинкали с бараниной и зеленью</div>
                <div className="cart__item__count-option">
                    <div className="cart__item__decriment">
                        <img src={require("../../assets/i/minus.svg").default} alt="минус" />
                    </div>
                    <div className="cart__item__count">1</div>
                    <div className="cart__item__increment">
                        <img src={require("../../assets/i/gray_plus.svg").default} alt="плюс" />
                    </div>
                </div>
            </div>
            <div className="cart__item__right">
                <div className="cart__item__price">280 ₽</div>
                <button className="cart__item__remove">
                    <img src={require("../../assets/i/remove.svg").default} alt="Удалить" />
                </button>
            </div>
        </div>
    );
}

export default CartItem;