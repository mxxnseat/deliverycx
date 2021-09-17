import { FC } from "react";
import CartInfo from "./CartInfo";
import CartList from "./CartList";

interface IProps {
    Memo: FC,
    Form: FC
}
const CartWrapper: FC<IProps> = ({ Memo, Form }) => {
    return (
        <>
            <div className="container">
                <Memo />
                <CartList />
                <CartInfo />
            </div>

            <Form />
        </>
    );
}


export default CartWrapper;