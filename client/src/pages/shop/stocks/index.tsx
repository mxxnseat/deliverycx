import { FC, memo, PropsWithChildren, useState } from "react";
import StockItem from "./item";
import cn from "classnames";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import Lenta, {IProps as LentaProps} from "../../../components/lenta";

// const MemoLenta = memo<FC<LentaProps>>(Lenta, (prev: Readonly<PropsWithChildren<LentaProps>>, next:Readonly<PropsWithChildren<LentaProps>>)=>{
// });

const Stocks: FC = memo(() => {
    const [currentItem, setCurrentItem] = useState<number>(1);
    const mock_arr: string[] = ['stock1.jpg','stock2.jpg','stock3.jpg'];

    const sliderContent: string[] = [...mock_arr];
    sliderContent.push(mock_arr[0]);
    sliderContent.unshift(mock_arr[mock_arr.length - 1]);

    const count: number = mock_arr.length;

    const conditionDelta = (): number => {
       
        if (currentItem === 1) {
            return -15;
        } else if (currentItem === mock_arr.length) {
            return 15;
        } else {
            return 15 * (currentItem - 2);
        }
        
    }
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "25px",
        slidesToShow: 1,
        speed: 500,
        rows: 1,
        slidesPerRow: 1,
        dots: true,
        dotsClass:'stocks__points'
      };

    return (
        <div className="stocks">
            <Slider {...settings}>
                <StockItem content={'stock8.png'} />
                <StockItem content={'stock2.png'} />
                <StockItem content={'stock3.png'} />
                <StockItem content={'stock4.png'} />
                <StockItem content={'stock5.png'} />
                <StockItem content={'stock6.png'} />
                <StockItem content={'stock7.png'} />
            </Slider>
            {
                /*
                
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
                
                */
            }
        </div>
    )
});

export default Stocks;