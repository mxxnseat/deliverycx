import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const CheckOut: FC = () : JSX.Element => {

  const orderNumber = useSelector((state: RootState) => state.cart.checkout.orderNumber);



  return (
    
        <div className="checkout">
          <img src={require("../../assets/img/ok.png").default} />
          <div className="checkout__title">Спасибо за заказ!</div>
          <div className="checkout__order">№ {orderNumber}</div>
          <p className="checkout__dash">
          Ваш заказ оформлен. <br />
          С вами свяжится администратор.</p>
        </div>
     
    
  )
}
export default CheckOut