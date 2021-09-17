import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import ProductItem from "./item"

const ProductList: FC = () => {
    const products = useSelector((state: RootState)=>state.shop.productsList);

    return (
        <div className="product__list">

            {
                products.map(item=>{
                    return <ProductItem key={item._id} {...item}/>
                })
            }
        </div>
    )
}

export default ProductList;