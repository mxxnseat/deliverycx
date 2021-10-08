import { AxiosInstance, AxiosPromise } from "axios"
import Api from ".";
import encodeQueryData from "../helpers/encodeQuery";

type ProductsParams = {
  organization: string,
  category?: string,
  searchQuery?: string
  favoritesList?:any // временно
}

const getApi = ({ api }: Api) => {
  const request: AxiosInstance = api
  return {
      getProducts<R>(query: ProductsParams): AxiosPromise<R> {
      
      const encodeQuery = encodeQueryData(query);

      return request({
        method: 'get',
        url: `api/getProducts?${encodeQuery}`
      })
    },

    getCategories<R>(): AxiosPromise<R> {
      return request({
        method: "get",
        url: "api/getCategories"
      })
    },

    getCities<R>(): AxiosPromise<R> {
      return request({
        method: "get",
        url: "api/getCities"
      })
    },

    getAddrresses<R>(cityId: string): AxiosPromise<R> {
      return request({
        method: "get",
        url: `api/getAddresses?city=${cityId}`
      })
    },

    getProduct<R>(productId: string, organization: string): AxiosPromise<R> {
      return request({
        method: "get",
        url: `api/getProduct/${productId}?organization=${organization}`
      })
    }
  }
}

export default getApi(Api.getInstance)