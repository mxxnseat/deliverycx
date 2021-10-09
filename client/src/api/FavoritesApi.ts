import {AxiosInstance, AxiosPromise } from "axios";
import Api from ".";

const FavoritesApi = ({ api }: Api) => {
  const request: AxiosInstance = api;
  return {
    addFavorite<R>(productId: string): AxiosPromise<R> {

        return request({
            method: "POST",
            url: `shop/addToFavorite`,
            data: {
              productId
            }
        });
    }
  }
}
export default FavoritesApi(Api.getInstance);