import { AxiosInstance, AxiosPromise } from "axios"
import Api from ".";

const getApi = ({ api }: Api) => {
  const request: AxiosInstance = api
  return {
    getProducts<R>(categoryId: string, organizationId: string): AxiosPromise<R> {
      return request({
        method: 'get',
        url: `api/getProducts?categoryId=${categoryId}&organizationId=${organizationId}`,

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
        url: `api/getAddresses?cityId=${cityId}`
      })
    },

    getProduct<R>(productId: string): AxiosPromise<R> {
      return request({
        method: "get",
        url: `api/getProduct/${productId}`
      })
    }
  }
}

export default getApi(Api.getInstance)