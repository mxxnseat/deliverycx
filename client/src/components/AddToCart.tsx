import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../store/actions/cart"

interface IProps {
    id: string
}

const AddToCart: FC<IProps> = ({ id }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const clickHandler = () => {
        dispatch(addToCartAction(id));
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    return <button className="add-to-cart" onClick={clickHandler}></button>
}

export default AddToCart;