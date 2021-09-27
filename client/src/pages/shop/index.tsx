import { FC } from "react";
import { useSelector } from "react-redux";
import { animated, useTransition } from "react-spring"
import { RootState } from "../../store";

//components
import AdressInfo from './AdressInfo';
import Categories from './categories';
import Header from './header';
import Stocks from './stocks';
import ProductList from './product_list/';
import LinkToCart from "./LinkToCart";
import ShopSearch from "./search";

const Shop: FC<{}> = () => {
    const {category, isSearch} = useSelector((state: RootState) => state.shop);
    const transitions = useTransition(isSearch, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    return transitions((style, item) => (
        <>
            {!item ?
                <animated.div style={style}>
                    <div className="container">
                        <AdressInfo />
                        <Header />
                    </div>
                    <Categories />
                    <Stocks />
                    <div className="container">
                        {category && <ProductList category={category._id} />}
                    </div>
                    <LinkToCart />
                </animated.div>
                :
                <animated.div style={style}>
                    <ShopSearch />
                </animated.div>
            }
        </>

    ));
}


export default Shop;