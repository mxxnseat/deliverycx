import { FC, useEffect, useState, useRef } from "react";
import cn from "classnames";
import axios from "axios";
import Slider from "infinite-react-carousel";
import { useDispatch, useSelector } from "react-redux";


import { setCategoryAction } from "../../store/actions/shop";
import { RootState } from "../../store";
import { ICategory } from "../../types/responses";
import Api from "../../api/Api";


const Categories: FC = () => {
    const dispatch = useDispatch();
    const slider = useRef<typeof Slider>(null);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const handleSliderClick = (index: number) => {
        slider.current?.slickGoTo(index);
        setCurrentSlide(index);
    }

    useEffect(() => {
        (async ()=>{
            const {data} = await Api.getCategories<ICategory[]>();
            console.log(data);
            dispatch(setCategoryAction(data[0]));
            setCategories(data);
        })();
    }, []);
    useEffect(()=>{
        dispatch(setCategoryAction(categories[currentSlide]));
    }, [currentSlide]);

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
                                        <img src={category.images.imageUrl} alt={category.name} />
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

export default Categories;