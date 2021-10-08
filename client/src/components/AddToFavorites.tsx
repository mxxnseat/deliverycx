import { FC, memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { FavoritesAction } from "../store/actions/shop";
import cn from "classnames";
import profile from '../api/Profile';

interface IProps {
    id: string
}

const AddToFavorites: FC<IProps> = ({ id }) => {
    const dispatch = useDispatch();
    const favoritesList = useSelector((state: RootState) => state.shop.favorites.list);
    const favoritesActive = favoritesList.includes(id)
    
    const favoriteCN = cn("product__item__favorite", { favorite_active: favoritesActive });
    
    const handlClick = useCallback(async (id: string) => dispatch(FavoritesAction(id, favoritesActive)), [favoritesActive])
    
    

    const checkSetFavorites = async () => {
        try {
            // // const { data, status } = await profile.getProfile();
            // if (status === 200 && (data.isAuth && !data.user?.isVerify)) {
            //     const Storage = {
            //         username:data.user?.username,
            //         favoritesList
            //     }
            //     localStorage.setItem("favorites",JSON.stringify(Storage) );
            // }
        } catch (error) {
            console.log(error);
            return
        }
    }

    useEffect(() => {
        checkSetFavorites()
    }, [favoritesActive])

    

    return <button className={favoriteCN} onClick={() => handlClick(id)}></button>
}

export default memo(AddToFavorites);