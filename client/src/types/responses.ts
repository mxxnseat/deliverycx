import { ISubmitData } from "../pages/cart/delivery/form";

export interface ICity {
    _id: string,
    name: string
}
export interface IAuthResponse{
    isAuth: boolean,
    access?: string
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
export interface IProduct<C = ICategory> {
    image: string,
    id: string,
    category: string,
    code: string,
    group: C,
    isIncludedInMenu: boolean,
    name: string,
    isFav: boolean,
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

export type ICartProducts = {product: IProduct<string>} & { amount: number, _id: string }
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

export interface ICheckOUT {
    promocode: string,
    cart_choice: string,
    totalPrice: number
}
export interface IUpdateUserResponse {
    message: string,
    user: Omit<IUser, "organization">
}
export interface IRemoveCartItemResponse {
    cartId: string
}
export interface IAddToFavorite {
    message: string,
    isActive: boolean
}
export type CheckoutResponseType<T> = {
    [K in keyof T]: T[K]
} & { success: boolean }

export type CheckoutSuccessResponseType = CheckoutResponseType<{orderNumber: number}>
export type CheckoutFailedResponseType = CheckoutResponseType<{errors: IErrors}>

export interface IErrors {
    [key: string]: {
        message: string
    }
}