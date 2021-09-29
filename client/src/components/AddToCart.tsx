import { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../store/actions/cart"
import debounce from 'lodash.debounce';


interface IProps {
    id: string
}

const AddToCart: FC<IProps> = ({ id }) => {
    const dispatch = useDispatch();

    const debouncedChangeHandler = debounce(() => dispatch(addToCartAction(id)), 500)  

    return <button className="add-to-cart" onClick={debouncedChangeHandler}></button>
}

export default memo(AddToCart);