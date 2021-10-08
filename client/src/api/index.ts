import Axios, { AxiosInstance, AxiosPromise, AxiosResponse, AxiosError } from "axios";
import {config} from "../config";
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

class Api {
    static _instanse: null | Api = null
    private URL: string = config.REACT_APP_API_URL
    api: AxiosInstance

    private constructor() {
        this.api = Axios.create({
            baseURL: this.URL,
        })
        this.api.interceptors.response.use((response: AxiosResponse)=>{
            return response;
        }, (err)=>{
            history.push("/");
            
            return Promise.reject(err);
        })
    }
    static get getInstance() {
        if (!Api._instanse) {
            Api._instanse = new Api()
        }
        return Api._instanse
    }
}

  export default Api;