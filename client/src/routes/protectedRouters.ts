    import { ComponentType, FC } from "react";

import ProductCard from "../pages/shop/product_card";
import Shop from "../pages/shop";
import Cart from "../pages/cart";
import About from "../pages/about";
import NotFound from "../pages/notFound";
import { IRoute, ROUTES } from "./types";



const routes: IRoute[] = [
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
]

export default routes;