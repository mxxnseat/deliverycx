import { FC } from "react";

const CheckOut: FC = () : JSX.Element => {
  return (
    <div className="checkout_box">
      
        <div className="checkout">
          <img src={require("../../assets/img/ok.png").default} />
          <div className="checkout__title">Спасибо за заказ!</div>
          <div className="checkout__order">№ 324567</div>
          <p className="checkout__dash">
          Ваш заказ оформлен. <br />
          С вами свяжится администратор.</p>
        </div>
     
    </div>
  )
}
export default CheckOut