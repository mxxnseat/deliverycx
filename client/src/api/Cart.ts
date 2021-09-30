import {AxiosInstance, AxiosPromise } from "axios";
import Api from ".";
import { ICart, ICheckOUT } from "../types/responses";

const Cart = ({ api }: Api)=>{
    const request: AxiosInstance = api;

    return {
        addToCart<R extends ICart>(productId: string): AxiosPromise<R>{
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
        removeOne<R extends ICart>(cartId: string): AxiosPromise<R>{
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
        clear(): AxiosPromise<[]>{
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
        changeAmount<R extends ICart>(cartId: string, type: "inc" | "dec"): AxiosPromise<R>{
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
        getCart<R extends ICart>(): AxiosPromise<R>{
            const authToken = localStorage.getItem("authToken");

            const headers = authToken ? {
                authorization: `Bearer ${authToken}`
            } : {};

            return request({
                method: "GET",
                url: `shop/getCart`,
                headers
            })
        },
        checkOutCart(data:ICheckOUT): AxiosPromise<ICheckOUT> {
            const authToken = localStorage.getItem("authToken");

            const headers = authToken ? {
                authorization: `Bearer ${authToken}`
            } : {};
            return request({
                method: "POST",
                url: `shop/checkout`,
                headers,
                data
            })
        }
    }
}


export default Cart(Api.getInstance);