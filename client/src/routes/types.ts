import { ComponentType } from "react";

export enum ROUTES {
    WELCOME = "/",
    ADDRESS = '/address',
    SHOP = "/shop",
    SHOP_PRODUCT = "/shop/product/:id",
    CART = "/cart",
    ABOUT = "/about",
    NOT_FOUND = "*"
}
export interface IRoute{
    exact?: boolean,
    path: string,
    component: ComponentType<any>
}