import { ComponentType, FC } from "react";

import ProductCard from "../pages/shop/product_card";
import ChooseAdress from "../pages/welcome";
import Shop from "../pages/shop";
import Cart from "../pages/cart";
import About from "../pages/about";
import NotFound from "../pages/notFound";
import SelectAdress from "../pages/welcome/SelectAdress";

export enum ROUTES {
    WELCOME = "/",
    ADDRESS = '/address',
    SHOP = "/shop",
    SHOP_PRODUCT = "/shop/product/:id",
    CART = "/cart",
    ABOUT = "/about",
    NOT_FOUND = "*"
}
interface IRoute{
    exact?: boolean,
    path: string,
    component: ComponentType<any>
}

const routes: IRoute[] = [
    {
        exact: true,
        path: ROUTES.WELCOME,
        component: ChooseAdress
    },
    {
        exact: true,
        path: ROUTES.ADDRESS,
        component: SelectAdress
    },
    {
        exact: true,
        path: ROUTES.SHOP,
        component: Shop
    },
    {
        exact: true,
        path: ROUTES.SHOP_PRODUCT,
        component: ProductCard
    },
    {
        exact: true,
        path: ROUTES.CART,
        component: Cart
    },
    {
        exact: true,
        path: ROUTES.ABOUT,
        component: About
    },
    {
        path: ROUTES.NOT_FOUND,
        component: NotFound
    }
]

export default routes;