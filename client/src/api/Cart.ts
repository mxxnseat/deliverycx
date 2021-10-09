import {AxiosInstance, AxiosPromise } from "axios";
import Api from ".";
import { ICart, ICheckOUT } from "../types/responses";

const Cart = ({ api }: Api)=>{
    const request: AxiosInstance = api;

    return {
        addToCart<R extends ICart>(product: string): AxiosPromise<R>{

            return request({
                method: "POST",
                url: `shop/addToCart`,
                data: {
                    product
                }
            });
        },
        removeOne<R extends ICart>(cart: string): AxiosPromise<R>{

            return request({
                method: "DELETE",
                url: `shop/remove`,
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

            return request({
                method: "PATCH",
                url: `shop/changeAmount`,
                data: {
                    cart,
                    type,
                    count
                }
            });
        },
        getCart<R extends ICart>(): AxiosPromise<R>{
            const authToken = localStorage.getItem("authToken");


            return request({
                method: "GET",
                url: `shop/getCart`,
            })
        },
        checkOutCart<R>(data:ICheckOUT): AxiosPromise<R> {

            return request({
                method: "POST",
                url: `shop/createOrder`,
                data
            })
        }
    }
}


export default Cart(Api.getInstance);