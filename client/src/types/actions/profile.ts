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
export interface IAuthSuccessAction{
    type: ACTIONS.AUTH_SUCCESS,
    payload: boolean
}
export interface IAuthFailAction{
    type: ACTIONS.AUTH_FAIL,
    payload: boolean
}

export type IActionsType = ISetProfileAction | IAuthSuccessAction | IAuthFailAction;