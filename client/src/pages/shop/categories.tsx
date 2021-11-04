import { FC, useEffect, useState, useRef, memo } from "react";
import cn from "classnames";
import Slider from "infinite-react-carousel";
import { useDispatch, useSelector } from "react-redux";

import { setCategoryAction } from "../../store/actions/shop";
import { ICategory } from "../../types/responses";
import Api from "../../api/Api";
import { RootState } from "../../store";


const Categories: FC = () => {
    const dispatch = useDispatch();
    const slider = useRef<typeof Slider>(null);
    const category = useSelector((state: RootState)=>state.shop.category);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [currentSlide, setCurrentSlide] = useState<number>(0);    
    const handleSliderClick = (index: number) => {
        slider.current?.slickGoTo(index);
        setCurrentSlide(index);
        dispatch(setCategoryAction(categories[index]))
        
    }

    const staticCat = {
        image: require("../../assets/i/favorite.png").default,
        _id: "favorite",
        code:null,
        isIncludedInMenu: false,
        name: "Избранное",
        order: 9
    }

    useEffect(() => {
        (async()=>{
            try {
                const { data } = await Api.getCategories<ICategory[]>();
                const cate:ICategory[] = [...data, staticCat]
                setCategories(prev => cate)
                
                if (category) {
                    const catIndex = cate.findIndex((cat) => cat.order === category.order)
                    dispatch(setCategoryAction(cate[catIndex]))
                    setCurrentSlide(catIndex);
                    
                } else {
                    dispatch(setCategoryAction(data[0]));
                }

            } catch (error) {
                console.log(error)
            }
        })();

        
    }, []);

    /*
    useEffect(() => {
        console.log('w',currentSlide)
        //dispatch(setCategoryAction(categories[currentSlide]));
    }, [currentSlide]);
    */

    

    return categories.length ? (<Slider
            className="categories"
            initialSlide={currentSlide}
            afterChange={(index: number)=>setCurrentSlide(index)}
            ref={slider}
            centerMode
            slidesToShow={5}
            arrows={false}
            centerPadding={0}
        >
            {
                categories.map((category, i) => {
                    const CN = cn("categories__item", {active: currentSlide === i});
                    
                    return (
                        <div key={i}
                            className={CN}
                            onClick={() => handleSliderClick(i)}
                        >
                            <div className="categories__item__content-wrapper">
                                <div className="categories__item__img-wrap">
                                    <div>
                                        <img src={category.image} alt={category.name} />
                                    </div>
                                </div>
                                <div className="categories__item__title">{category.name}</div>
                            </div>
                        </div>
                    );
                })
            }
        </Slider>        
    ) : <></>
}

export default memo(Categories);