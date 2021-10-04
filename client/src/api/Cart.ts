import {AxiosInstance, AxiosPromise } from "axios";
import Api from ".";
import { ICart, ICheckOUT } from "../types/responses";

const Cart = ({ api }: Api)=>{
    const request: AxiosInstance = api;

    return {
        addToCart<R extends ICart>(product: string): AxiosPromise<R>{
            const authToken = localStorage.getItem("authToken");

            const headers = authToken ? {
                authorization: `Bearer ${authToken}`
            } : {}

            return request({
                method: "POST",
                url: `shop/addToCart`,
                headers,
                data: {
                    product
                }
            });
        },
        removeOne<R extends ICart>(cart: string): AxiosPromise<R>{
            const authToken = localStorage.getItem("authToken");

            const headers = authToken ? {
                authorization: `Bearer ${authToken}`
            } : {}

            return request({
                method: "DELETE",
                url: `shop/remove`,
                headers,
                data: {
                    cart
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
        changeAmount<R extends ICart>(cart: string, type: "inc" | "dec",count:number): AxiosPromise<R>{
            const authToken = localStorage.getItem("authToken");

            const headers = authToken ? {
                authorization: `Bearer ${authToken}`
            } : {}

            return request({
                method: "PATCH",
                url: `shop/changeAmount`,
                headers,
                data: {
                    cart,
                    type,
                    count
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
        checkOutCart<R>(data:ICheckOUT): AxiosPromise<R> {
            const authToken = localStorage.getItem("authToken");

            const headers = authToken ? {
                authorization: `Bearer ${authToken}`
            } : {};
            return request({
                method: "POST",
                url: `shop/createOrder`,
                headers,
                data
            })
        }
    }
}


export default Cart(Api.getInstance);