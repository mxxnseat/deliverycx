import Axios, { AxiosInstance, AxiosPromise } from "axios";
import {config} from "../config";

class Api{
  static _instanse:null | object = null
  private URL:string = config.REACT_APP_API_URL + '/api'
  api:AxiosInstance

   constructor(){
    this.api = Axios.create({
      baseURL: this.URL,
      })
   }
   static get getInstance(){
      if(!Api._instanse){
        Api._instanse = new Api()
      }
      return Api._instanse
    }
}



const getApi = ({api}: any) => {
  const request:AxiosInstance = api
  return {
    getProducts<R>(categoryId:string, organizationId: string):AxiosPromise<R> {
      return request({
        method: 'get',
        url: `getProducts?categoryId=${categoryId}&organizationId=${organizationId}`,
        
      })
    },

    getCategories<R>():AxiosPromise<R>{
      return request({
        method: "get",
        url: "getCategories"
      })
    },

    getCities<R>():AxiosPromise<R>{
      return request({
        method: "get",
        url: "getCities"
      })
    },

    getAddrresses<R>(cityId: string):AxiosPromise<R>{
      return request({
        method: "get",
        url: `getAddresses?cityId=${cityId}`
      })
    },
    
    getProduct<R>(productId: string):AxiosPromise<R>{
      return request({
        method: "get",
        url: `getProduct/${productId}`
      })
    }
  }
}
 
export default getApi(Api.getInstance)