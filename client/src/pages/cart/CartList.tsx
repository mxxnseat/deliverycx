import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "../../store";
import CartItem from "./CartItem";


const CartList: FC = () => {
    const history = useHistory();
    const cartList = useSelector((state: RootState) =>state.cart.list);

    useEffect(()=>{
        if(cartList.length === 0){
            history.push("/shop");
        }
    }, [cartList]);
    return (
        <div className="cart__goods-list">
            {
                cartList.map(el=>{
                    return <CartItem key={el._id} {...el} />
                })
            }
        </div>
    )
}

export default CartList;