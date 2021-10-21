import { FC, memo, PropsWithChildren, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { IProduct } from "../../../types/responses";
import Product from "./item"
import api from "../../../api/Api";
import Loader from "../../../mui/loader";
import { isEqual } from "lodash";

interface IProps {
    category?: string, 
    searchQuery?: string
}
enum Statuses {
    NEITRAL = "NEITRAL",
    PENDING = "PENDING",
    FINISHED = "FINISHED"
}
type Status = keyof typeof Statuses;

const ProductList: FC<IProps> = ({ category, searchQuery }) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [status, setStatus] = useState<Status>(Statuses.NEITRAL);
    const organization = useSelector((state: RootState) => state.address.address._id);


    useEffect(() => {
        setProducts([]);
        (async () => {
            setStatus(Statuses.PENDING);
            const { data, status } = await api.getProducts<IProduct[]>({ organization, category, searchQuery });

            if (status === 200) {
                setProducts(data);
            }
            setStatus(Statuses.FINISHED);
        })();

    }, [category, searchQuery]);

    return (
        <div className="product__list">
            {

                status === Statuses.FINISHED ? (
                   products.length ? products.map(item => <Product key={item.id} {...item} />) : "Эта категория пуста :("

                ) : <Loader />
            }
        </div>
    )
}

export default memo(ProductList, (prev: Readonly<PropsWithChildren<IProps>>, next: Readonly<PropsWithChildren<IProps>>)=>{
    if(isEqual(prev, next)){
        return true;
    }else{
        return false;
    }
});