export interface IInitialState{
    isAuth: boolean,
    isVerify: boolean,
    username: string | null,
    name?: string | null,
    phone?: string | null,
}

export enum ACTIONS{
    SET_PROFILE = "SET_PROFILE",
}

export interface ISetProfileAction{
    type: ACTIONS.SET_PROFILE,
    payload: IInitialState
}

export type IActionsType = ISetProfileAction;