import { FC, memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { debounce } from "lodash";
import FavoritesApi from "../api/FavoritesApi";
import { IAddToFavorite } from "../types/responses";

interface IProps {
    id: string,
    isFav: boolean
}

const AddToFavorites: FC<IProps> = ({ id, isFav}) => {
    const [isActive, setIsActive] = useState<boolean>(isFav);
    
    const favoriteCN = cn("product__item__favorite", { favorite_active: isActive });
    

    const debaunceHandleClick = debounce(async ()=>{
        const { data, status } = await FavoritesApi.addFavorite<IAddToFavorite>(id);
        if(status === 200){
            setIsActive(data.isActive);
        }
        
    }, 400);

    return <button className={favoriteCN} onClick={debaunceHandleClick}></button>
}

export default memo(AddToFavorites);