import axios, { AxiosInstance, AxiosPromise, AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import {config} from "../config";
import {createBrowserHistory} from "history";
import {history} from "../";

class Api {
    static _instanse: null | Api = null
    private URL: string = config.REACT_APP_API_URL
    api: AxiosInstance

    private constructor() {
        this.api = axios.create({
            withCredentials: true,
            baseURL: this.URL,
        })
        this.api.interceptors.response.use((response: AxiosResponse)=>{
            return response;
        }, (err)=>{
            
            if(err?.response?.status === 401){
                history.push("/");
            }
            if(err?.response?.status === 404){
                history.push("/404");
            }

            return Promise.reject(err);
        });
        
        this.api.interceptors.request.use((config: AxiosRequestConfig)=>{
            const token = localStorage.getItem("authToken");
            if(token){
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });
    }
    static get getInstance() {
        if (!Api._instanse) {
            Api._instanse = new Api()
        }
        return Api._instanse
    }
}

  export default Api;