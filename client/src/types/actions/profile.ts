import { IUser } from "../responses";

export interface IInitialState{
    isAuth: boolean,
    isVerify: boolean,
    username: string | null,
    name?: string | null,
    phone?: string | null,
}

export enum ACTIONS{
    SET_PROFILE = "SET_PROFILE",
    AUTH_SUCCESS = "AUTH_SUCCESS",
    AUTH_FAIL = "AUTH_FAIL"
}

export interface ISetProfileAction{
    type: ACTIONS.SET_PROFILE,
    payload: IInitialState
}
export interface IAuthAction<T extends ACTIONS.AUTH_SUCCESS | ACTIONS.AUTH_FAIL>{
    type: T,
    payload: boolean
}

export type IActionsType = ISetProfileAction | IAuthAction<ACTIONS.AUTH_SUCCESS | ACTIONS.AUTH_FAIL>;