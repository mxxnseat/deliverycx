import { FC } from "react";

const CartForm: FC = () => {
    return (
        <div className="cart__memo">
            <div className="cart__memo__banner">Бесплатная доставка от 500 ₽</div>

            Ваш заказ будет <b>доставлен курьером</b>. Ресторан находится далеко от вашего адреса, поэтому доставка может занять более 40 минут.
        </div>
    );
}


export default CartForm;