import { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../store/actions/cart"
import debounce from 'lodash.debounce';


interface IProps {
    id: string
    classe:string
}

const AddToCart: FC<IProps> = ({ id,classe }) => {
    const dispatch = useDispatch();

    //const debouncedChangeHandler = debounce(() => dispatch(addToCartAction(id)), 100)  

    return <button className={classe} onClick={() => dispatch(addToCartAction(id))}></button>
}

export default memo(AddToCart);