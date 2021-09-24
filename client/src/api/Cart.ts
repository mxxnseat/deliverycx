import {AxiosInstance, AxiosPromise } from "axios";
import Api from ".";
import { ICart } from "../types/responses";

const Cart = ({ api }: Api)=>{
    const request: AxiosInstance = api;

    return {
        addToCart<R>(productId: string): AxiosPromise<R>{
            const authToken = localStorage.getItem("authToken");

            const headers = authToken ? {
                authorization: `Bearer ${authToken}`
            } : {}

            return request({
                method: "POST",
                url: `shop/addToCart`,
                headers,
                data: {
                    productId
                }
            });
        },
        removeOne<R>(cartId: string): AxiosPromise<R>{
            const authToken = localStorage.getItem("authToken");

            const headers = authToken ? {
                authorization: `Bearer ${authToken}`
            } : {}

            return request({
                method: "DELETE",
                url: `shop/remove`,
                headers,
                data: {
                    cartId
                }
            }) 
        },
        clear(): AxiosPromise<string>{
            const authToken = localStorage.getItem("authToken");

            const headers = authToken ? {
                authorization: `Bearer ${authToken}`
            } : {}

            return request({
                method: "DELETE",
                url: `shop/clear`,
                headers
            })
        },
        changeAmount<R>(cartId: string, type: "inc" | "dec"): AxiosPromise<R>{
            const authToken = localStorage.getItem("authToken");

            const headers = authToken ? {
                authorization: `Bearer ${authToken}`
            } : {}

            return request({
                method: "PATCH",
                url: `shop/changeAmount`,
                headers,
                data: {
                    cartId,
                    type
                }
            });
        },
        getCart(): AxiosPromise<ICart & {totalPrice: number}>{
            const authToken = localStorage.getItem("authToken");

            const headers = authToken ? {
                authorization: `Bearer ${authToken}`
            } : {};

            return request({
                method: "GET",
                url: `shop/getCart`,
                headers
            })
        }
    }
}


export default Cart(Api.getInstance);