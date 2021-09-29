import { FC, useState, memo } from "react";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../store/actions/cart"

interface IProps {
    id: string
}

const AddToCart: FC<IProps> = ({ id }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const clickHandler = () => {
        if(!isLoading) dispatch(addToCartAction(id));
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    return <button className="add-to-cart" onClick={clickHandler}></button>
}

export default memo(AddToCart);