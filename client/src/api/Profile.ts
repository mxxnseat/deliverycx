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

            return request({
                method: "POST",
                url: `profile/login`,
            })
        },
        getProfile(): AxiosPromise<ICheckData> {
            
            return request({
                method: "POST",
                url: `profile/getProfile`
            })
        },
        update(data: IUpdateData): AxiosPromise<IUpdateUserResponse> {
            return request({
                method: "POST",
                url: `profile/update`,
                data
            })
        },
        register<R>(organization: string): AxiosPromise<R>{
            return request({
                method: "POST",
                url: `profile/register`,
                data: {
                    organization
                }
            })
        }
    }
}


export default profile(Api.getInstance)