import {AxiosInstance, AxiosPromise } from "axios";
import Api from ".";
import { ICart } from "../types/responses";

const Cart = ({ api }: Api)=>{
    const request: AxiosInstance = api;
    const authToken = localStorage.getItem("authToken");

    return {
        addToCart(productId: string): AxiosPromise<string>{
            return request({
                method: "POST",
                url: `shop/addToCart`,
                headers: {
                    authorization: authToken ? `Bearer ${authToken}` : null
                },
                data: {
                    productId
                }
            });
        },
        getCart(): AxiosPromise<ICart>{
            return request({
                method: "GET",
                url: `shop/addToCart`,
                headers: {
                    authorization: authToken ? `Bearer ${authToken}` : null
                }
            });
        },
        removeOne(cartId: string): AxiosPromise<string>{
            return request({
                method: "DELETE",
                url: `shop/remove`,
                headers: {
                    authorization: authToken ? `Bearer ${authToken}` : null
                },
                data: {
                    cartId
                }
            }) 
        },
        clear(): AxiosPromise<string>{
            return request({
                method: "DELETE",
                url: `shop/clear`,
                headers: {
                    authorization: authToken ? `Bearer ${authToken}` : null
                }
            })
        },
        changeAmount(cartId: string, type: "inc" | "dec"): AxiosPromise<string>{
            return request({
                method: "PATCH",
                url: `shop/changeAmount`,
                headers: {
                    authorization: authToken ? `Bearer ${authToken}` : null
                },
                data: {
                    cartId,
                    type
                }
            });
        }
    }
}


export default Cart(Api.getInstance);