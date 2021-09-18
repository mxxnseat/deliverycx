import { AxiosInstance, AxiosPromise } from "axios";
import Api from ".";
import { IInitialState } from "../types/actions/profile";
import { IUpdateUserResponse, IUser } from "../types/responses";

interface IUpdateData {
    name?: string,
    phone?: string,
    email?: string,
    organization?: string
}
interface ICheckData{
    isAuth: boolean,
    user?: IUser
}

const profile = ({ api }: Api) => {
    const request: AxiosInstance = api;
    

    return {
        login(): AxiosPromise<string> {
            const authToken = localStorage.getItem("authToken");
            const headers = authToken ? {
                authorization: `Bearer ${authToken}`
            } : {}

            return request({
                method: "POST",
                url: `profile/login`,
                headers
            })
        },
        checkSelectedAddress(): AxiosPromise<ICheckData> {
            const authToken = localStorage.getItem("authToken");
            console.log(authToken);
            const headers = authToken ? {
                authorization: `Bearer ${authToken}`
            } : {}

            return request({
                method: "POST",
                url: `profile/checkSelectedAddress`,
                headers
            })
        },
        update(data: IUpdateData): AxiosPromise<IUpdateUserResponse> {
            const authToken = localStorage.getItem("authToken");
            const headers = authToken ? {
                authorization: `Bearer ${authToken}`
            } : {}

            return request({
                method: "POST",
                url: `profile/update`,
                headers,
                data
            })
        }
    }
}


export default profile(Api.getInstance)