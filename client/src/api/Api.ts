import axios, { AxiosInstance, AxiosPromise, CancelTokenSource } from "axios"
import Api from ".";
import encodeQueryData from "../helpers/encodeQuery";

type ProductsParams = {
  organization: string,
  category?: string,
  searchQuery?: string
}

const getApi = ({ api }: Api) => {
  const request: AxiosInstance = api;
  let productsRequestSource: CancelTokenSource;

  return {
      getProducts<R>(query: ProductsParams): AxiosPromise<R> {
      
      const encodeQuery = encodeQueryData(query);
      
      if(productsRequestSource) productsRequestSource.cancel();

      productsRequestSource = axios.CancelToken.source();

      return request({
        method: 'get',
        url: `api/getProducts?${encodeQuery}`,
        cancelToken: productsRequestSource.token
      })
    },

    getCategories<R>(): AxiosPromise<R> {
      return request({
        method: "get",
        url: "api/getCategories",
      })
    },

    getCities<R>(city:string = ''): AxiosPromise<R> {
      return request({
        method: "get",
        url: `api/getCities?city=${city}`
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