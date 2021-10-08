import { FC, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { IProduct } from "../../../types/responses";
import Product from "./item"
import api from "../../../api/Api";
import React from "react";


interface IProps  {
    category?: string,
    searchQuery?: string
}

export const FavoritesContext = React.createContext<string[]>([])
    
const ProductList: FC<IProps> = ({category, searchQuery}) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const organization = useSelector((state: RootState)=>state.address.address._id);
    const favoritesList = useSelector((state: RootState) => state.shop.favorites.list);
    

    useEffect(()=>{
        (async ()=>{
            const {data, status} = await api.getProducts<IProduct[]>({organization, category, searchQuery});

            if(status === 200){
                setProducts(data);
            }
        })();
       
    }, [category, searchQuery]);

    
    return (
        <div className="product__list">

            {
                products.map(item=>{
                    return <FavoritesContext.Provider value={favoritesList}><Product key={item.id} {...item}/></FavoritesContext.Provider>
                })
            }
        </div>
    )
}

export default memo(ProductList);