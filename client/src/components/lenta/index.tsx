import { FC, useEffect, useRef, useState, Children, memo, PropsWithChildren } from "react";
import {isEqual} from "lodash";

export interface IProps {
    count: number,
    itemSize: number,
    currentItem: number,
    conditionDelta?: () => number,
    currentItemChanger?: (i: number) => void
}

const Lenta: FC<IProps> = ({ children, count, itemSize, currentItem, conditionDelta, currentItemChanger }) => {
    const mouseConfig = {
        isPress: false,
        startX: 0,
        startY: 0,
        deltaX: 0
    };

    const lentaRef = useRef<HTMLInputElement | null>(null);
    const [transform, setTransform] = useState<string>('');

    const mouseUpHandler = (e: MouseEvent) => {
        mouseConfig.isPress = false;
        mouseConfig.startX = 0;
        mouseConfig.startY = 0;

    }
    const mouseDownHandler = (e: MouseEvent) => {
        mouseConfig.isPress = true;
        mouseConfig.startX = e.x;
        mouseConfig.startY = 0;
    }
    const MouseMoveLenta = (e: MouseEvent) => {
        if (lentaRef === null) return;

        if (mouseConfig.isPress) {
            mouseConfig.deltaX = e.x - mouseConfig.startX;
            mouseConfig.startX = e.x;

            const childrenUsefulLength: number = Children.count(children) - 2;

            if (mouseConfig.deltaX < 0) {
                currentItem >= childrenUsefulLength ? currentItemChanger?.(1) : currentItemChanger?.(currentItem + 1);
            } else if (mouseConfig.deltaX > 0) {
                currentItem <= 1 ? currentItemChanger?.(childrenUsefulLength) : currentItemChanger?.(currentItem - 1);
            }


        }
    }

    const TouchUpHandler = (e: TouchEvent) => {
        mouseConfig.isPress = false;
        mouseConfig.startX = 0;
        mouseConfig.startY = 0;
    }
    const TouchDownHandler = (e: TouchEvent) => {
        mouseConfig.isPress = true;
        mouseConfig.startX = e.targetTouches[0].pageX;
        mouseConfig.startY = e.targetTouches[0].pageY;
    }

    const TouchMoveLenta = (e: TouchEvent) => {
        if (lentaRef === null) return;

        if (mouseConfig.isPress) {
            const deltaY = e.targetTouches[0].pageY - mouseConfig.startY;
            if (-100 > deltaY && deltaY > 100) {
                return;
            }


            mouseConfig.deltaX = e.targetTouches[0].pageX - mouseConfig.startX;
            mouseConfig.startX = e.targetTouches[0].pageX;

            const childrenUsefulLength: number = Children.count(children) - 2;

            if (mouseConfig.deltaX < -2) {
                currentItem >= childrenUsefulLength ? currentItemChanger?.(1) : currentItemChanger?.(currentItem + 1);
            } else if (mouseConfig.deltaX > 2) {
                currentItem <= 1 ? currentItemChanger?.(childrenUsefulLength) : currentItemChanger?.(currentItem - 1);
            }
        }
    }


    useEffect(() => {
        if (typeof conditionDelta === "function") {
            setTransform((-itemSize * currentItem) - conditionDelta() + 'px');
        }

        lentaRef.current && lentaRef.current.addEventListener("mousemove", MouseMoveLenta);
        lentaRef.current && lentaRef.current.addEventListener("mousedown", mouseDownHandler);
        lentaRef.current && lentaRef.current.addEventListener("mouseup", mouseUpHandler);

        lentaRef.current && lentaRef.current.addEventListener("touchmove", TouchMoveLenta);
        lentaRef.current && lentaRef.current.addEventListener("touchstart", TouchDownHandler);
        lentaRef.current && lentaRef.current.addEventListener("touchend", TouchUpHandler);

        return () => {
            lentaRef.current && lentaRef.current.removeEventListener("mousemove", MouseMoveLenta);
            lentaRef.current && lentaRef.current.removeEventListener("mousedown", mouseDownHandler);
            lentaRef.current && lentaRef.current.removeEventListener("mouseup", mouseUpHandler);

            lentaRef.current && lentaRef.current.removeEventListener("touchmove", TouchMoveLenta);
            lentaRef.current && lentaRef.current.removeEventListener("touchstart", TouchDownHandler);
            lentaRef.current && lentaRef.current.removeEventListener("touchend", TouchUpHandler);
        }
    }, [currentItem]);




    return (
        <div className="viewport">
            <div className="lenta" ref={lentaRef} style={{ width: itemSize * count + 'px', transform: `translateX(${transform})` }}>
                {children}
            </div>
        </div>
    )
}


export default Lenta;