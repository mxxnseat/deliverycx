import { FC, ComponentClass } from "react";
import CartInfo from "./CartInfo";
import CartList from "./CartList";

interface IProps {
    Memo: FC,
    Form: FC | ComponentClass<any, any>
}
const CartWrapper: FC<IProps> = ({ Memo, Form }) => {
    return (
        <>
            <div className="container">
                <Memo />
            </div>
            <CartList />

            <div className="container">
                <CartInfo />
            </div>

            <Form />
        </>
    );
}


export default CartWrapper;