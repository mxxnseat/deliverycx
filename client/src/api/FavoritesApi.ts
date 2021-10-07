import {AxiosInstance, AxiosPromise } from "axios";
import Api from ".";

const FavoritesApi = ({ api }: Api) => {
  const request: AxiosInstance = api;
  return {
    addRequestFavorites(favorites:string[]) {
        const authToken = localStorage.getItem("authToken");

        const headers = authToken ? {
            authorization: `Bearer ${authToken}`
        } : {}

        return request({
            method: "POST",
            url: `shop/addToCart`,
            headers,
            data: favorites
        });  
    }
  }
}
export default FavoritesApi(Api.getInstance);