import { FC } from "react";

const CartMemo: FC = () => {
    return (
        <div className="cart__memo">
            Вы можете забрать заказ сами на <b>ул. Турецкая, д. 25</b>
            <br /><br />
            Мы хотим, чтобы наши встречи были максимально безопасными, поэтому просим заходить внутрь только в маске.
            <br/><br />
            Вы можете воспользоваться кнопкой «Я на месте» и ваш заказ вынесут на улицу или прямо к машине.
        </div>
    );
}


export default CartMemo;