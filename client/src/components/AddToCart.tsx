import { FC, memo, useRef } from "react";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../store/actions/cart"
import debounce from 'lodash.debounce';
import { useSpring, animated } from 'react-spring'

interface IProps {
    id: string
    _class:string
}

const AddToCart: FC<IProps> = ({ id,_class }) => {
    const dispatch = useDispatch();
    const springRef = useRef<any>()
    const [style, animate] = useSpring(() => ({
        x: 0,
        y: 0,
        opacity: 0,
        config: { duration: 500 },
    }))


    const queryCart: any = document.querySelector('.link-to-cart')
    

    
    const AnimateHandle = () => {
        animate({
            x: - (springRef.current.offsetLeft - 20),
            y: - (springRef.current.offsetTop - queryCart.offsetTop),
            opacity: 1,
            loop: {
                x: 0,
                y: 0,
                opacity: 0,
                immediate: true,
            }
        })
        dispatch(addToCartAction(id))
    }

    //const debouncedChangeHandler = debounce(() => dispatch(addToCartAction(id)), 100)  //dispatch(addToCartAction(id))

    return (
        <>
        <div className="hot_box" ref={springRef} onClick={AnimateHandle}>    
            <animated.div className="hot" style={style}  />
            <button className={_class}></button>
        </div>    
        </>
    )
}

export default memo(AddToCart);