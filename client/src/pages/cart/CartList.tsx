import { FC, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "../../store";
import CartItem from "./CartItem";


const CartList: FC = () => {
    const history = useHistory();
    const cartList = useSelector((state: RootState) => state.cart.list);
    const checkout = useSelector((state: RootState) =>state.cart.checkout);

    useEffect(()=>{
        if(cartList.length === 0 && !checkout.succsess){
            history.push("/shop");
        }
    }, [cartList]);

    if(!cartList){
        return <>loading</>
    }

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

export default memo(CartList);