import cn from "classnames";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import { CART_CHOICE } from "../../types/actions/cart";
import { cartChoiceAction} from "../../store/actions/cart";

const CartChoise: FC = () => { 
    const dispatch = useDispatch();
    const activeChoice: CART_CHOICE = useSelector((state: RootState) => state.cart.cart_choice);

    const deliveryCN = cn("cart__choice__item", { active: activeChoice === CART_CHOICE.DELIVERY });
    const pickupCN = cn("cart__choice__item", { active: activeChoice === CART_CHOICE.PICKUP });
    const onspotCN = cn("cart__choice__item", { active: activeChoice === CART_CHOICE.ONSPOT });

    return (
        <div className="cart__choice">
            <div className={deliveryCN} onClick={() => dispatch(cartChoiceAction(CART_CHOICE.DELIVERY))}>Доставка</div>
            <div className={pickupCN} onClick={() => dispatch(cartChoiceAction(CART_CHOICE.PICKUP))}>С собой</div>
            <div className={onspotCN} onClick={() => dispatch(cartChoiceAction(CART_CHOICE.ONSPOT))}>На месте</div>
        </div>
    )
}

export default CartChoise;