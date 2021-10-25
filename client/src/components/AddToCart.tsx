import { FC, memo, useRef } from "react";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../store/actions/cart"
import debounce from 'lodash.debounce';
import { useSpring, animated, config } from 'react-spring'

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
        config: {duration: 750, mass: 1, tension: 2000, friction: 2700 },
    }))
    const queryCart = document.querySelector('.link-to-cart') as HTMLElement       
    const root = document.querySelector("#root") as HTMLElement;

    const AnimateHandle = () => {
        try{
            if(springRef.current && queryCart && root){
                animate({
                    x: - (springRef.current.offsetLeft - 20),
                    y: - (springRef.current.offsetTop - (queryCart.offsetTop + root.scrollTop)),
                    opacity: 1,
                    loop: {
                        x: 0,
                        y: 0,
                        opacity: 0,
                        immediate: true,
                    }
                })
            }else{
                throw Error();
            }
            
        }catch(e){

        }
        
        dispatch(addToCartAction(id));
    }

    const debouncedChangeHandler = debounce(AnimateHandle, 400)  //dispatch(addToCartAction(id))

    return (
        <>
        <div className="hot_box" ref={springRef} onClick={debouncedChangeHandler}>    
            <animated.div className="hot" style={style}  />
            <button className={_class}></button>
        </div>    
        </>
    )
}

export default memo(AddToCart);