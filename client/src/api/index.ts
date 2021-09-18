import Axios, { AxiosInstance, AxiosPromise } from "axios";
import {config} from "../config";


class Api {
    static _instanse: null | Api = null
    private URL: string = config.REACT_APP_API_URL
    api: AxiosInstance

    constructor() {
        this.api = Axios.create({
            baseURL: this.URL,
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