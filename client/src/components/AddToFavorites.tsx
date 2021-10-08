import { FC, memo, useCallback, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { FavoritesAction } from "../store/actions/shop";
import cn from "classnames";
import profile from '../api/Profile';
import { FavoritesContext } from "../pages/shop/product_list";

interface IProps {
    id: string
}

const AddToFavorites: FC<IProps> = ({ id }) => {
    const dispatch = useDispatch();
    const favoritesList = useContext(FavoritesContext);
    const favoritesActive = favoritesList.includes(id)
    
    const favoriteCN = cn("product__item__favorite", { favorite_active: favoritesActive });
    
    const handlClick = useCallback(async (id: string) => dispatch(FavoritesAction(id, favoritesActive)), [favoritesActive])

    useEffect(() => {
        localStorage.setItem("favorites",JSON.stringify(Storage) );
    }, [favoritesActive])

    

    return <button className={favoriteCN} onClick={() => handlClick(id)}></button>
}

export default memo(AddToFavorites);