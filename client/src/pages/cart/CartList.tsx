import { FC, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "../../store";
import { IProduct } from "../../types/responses";
import CartItem from "./CartItem";


const CartList: FC = () => {
    const history = useHistory();
    const cartList = useSelector((state: RootState) => state.cart.list);
    const checkout = useSelector((state: RootState) =>state.cart.checkout);
    const errors = useSelector((state: RootState)=>state.cart.errors);

    useEffect(()=>{
        if(cartList.length === 0 && !checkout.success){
            history.push("/shop");
        }
    }, [cartList]);

    console.log(errors);

    return (
        <div className="cart__goods-list">
            {
                cartList.map((el)=>{
                    return <CartItem key={el._id} isError={errors[el.product.group]} {...el} />
                })
            }
        </div>
    )
}

export default memo(CartList);