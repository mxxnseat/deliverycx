import { ISubmitData } from "../pages/cart/delivery/form";

export interface ICity{
    _id: string,
    name: string
}

export interface IAddress {
    contacts: {
        phone: string,
        email: string
    },
    _id: string,
    city: ICity,
    latitude: number,
    longitude: number,
    street: string
}

export interface ICategory {
    image: string,
    _id: string,
    code: string | null,
    isIncludedInMenu: boolean,
    name: string,
    order: number
}
export interface IProduct {
    image: string,
    id: string,
    category: string,
    code: string,
    group: ICategory,
    isIncludedInMenu: boolean,
    name: string,
    order: number,
    price: number,
    weight: number,
    measureUnit: "порц" | "шт",
    description: string,
    additionalInfo: string,
}
export interface IFavorites {
    list: string[]
}

export type ICartProducts  = IProduct & {amount: number, _id: string}
export interface ICart {
    products: ICartProducts[],
    totalPrice: number
}

export interface IUser {
    username: string,
    _id: string,
    isVerify: boolean,
    name?: string,
    phone?: string,
    cart: ICart,
    organization: IAddress
}

export interface ICheckOUT{
    promocode: string,
    cart_choice: string,
    totalPrice:number
}
export interface ICheckoutResponse{
    success: boolean,
    orderNumber?: number
}
export interface IUpdateUserResponse{
    message: string,
    user: Omit<IUser, "organization">
}
export interface IRemoveCartItemResponse {
    cartId: string
}