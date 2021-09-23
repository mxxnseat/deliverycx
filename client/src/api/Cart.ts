import {AxiosInstance, AxiosPromise } from "axios";
import Api from ".";
import { ICart, IRemoveCartItemResponse } from "../types/responses";

const Cart = ({ api }: Api)=>{
    const request: AxiosInstance = api;
    const authToken = localStorage.getItem("authToken");

    return {
        addToCart<R>(productId: string): AxiosPromise<R>{
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
            const headers = authToken ? {
                authorization: `Bearer ${authToken}`
            } : {}

            return request({
                method: "DELETE",
                url: `shop/clear`,
                headers
            })
        },
        changeAmount(cartId: string, type: "inc" | "dec"): AxiosPromise<string>{
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
        }
    }
}


export default Cart(Api.getInstance);