import { FC, memo, PropsWithChildren, useState } from "react";
import StockItem from "./item";
import cn from "classnames";

import Lenta, {IProps as LentaProps} from "../../../components/lenta";

// const MemoLenta = memo<FC<LentaProps>>(Lenta, (prev: Readonly<PropsWithChildren<LentaProps>>, next:Readonly<PropsWithChildren<LentaProps>>)=>{
// });

const Stocks: FC = memo(() => {
    const [currentItem, setCurrentItem] = useState<number>(1);
    const mock_arr: number[] = [1, 2, 3, 4, 5, 6];

    const sliderContent: number[] = [...mock_arr];
    sliderContent.push(mock_arr[0]);
    sliderContent.unshift(mock_arr[mock_arr.length - 1]);

    const count: number = mock_arr.length;

    const conditionDelta = (): number => {
        if (currentItem === 1) {
            return -15;
        } else if (currentItem === mock_arr.length) {
            return 60;
        } else {
            return 15 * (currentItem - 2);
        }
    }


    return (
        <div className="stocks">
            <Lenta count={count} itemSize={291} conditionDelta={conditionDelta} currentItemChanger={(i)=>setCurrentItem(i)} currentItem={currentItem}>
                {
                    sliderContent.map((item, i) => <StockItem key={i} content={item} />)
                }
            </Lenta>
            <div className="stocks__points">
                {
                    mock_arr.map((item, i) => {
                        const activePointCN = cn("stocks__point", {active: i===currentItem-1});

                        return <div className={activePointCN} key={i} onClick={() => setCurrentItem(i + 1)}></div>
                    })
                }
            </div>
        </div>
    )
});

export default Stocks;