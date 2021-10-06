import { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../store/actions/cart"
import debounce from 'lodash.debounce';


interface IProps {
    id: string
    _class:string
}

const AddToCart: FC<IProps> = ({ id,_class }) => {
    const dispatch = useDispatch();

    //const debouncedChangeHandler = debounce(() => dispatch(addToCartAction(id)), 100)  

    return <button className={_class} onClick={() => dispatch(addToCartAction(id))}></button>
}

export default memo(AddToCart);