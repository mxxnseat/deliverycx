import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Product from "./item"

const ProductList: FC = () => {
    const products = useSelector((state: RootState)=>state.shop.productsList);

    return (
        <div className="product__list">

            {
                products.map(item=>{
                    return <Product key={item._id} {...item}/>
                })
            }
        </div>
    )
}

export default ProductList;