import { IAddress, ICity } from "../responses";

export interface IInitialState {
    city: ICity,
    address: IAddress,
}

export enum ACTIONS{
    SET_CITY = "SET_CITY",
    SET_ADRESS = "SET_ADRESS",
    SET_IS_CITY = "SET_IS_CITY"
}


export interface IAdressAction{
    type: ACTIONS.SET_ADRESS,
    payload: IAddress
}
export interface ICityAction{
    type: ACTIONS.SET_CITY,
    payload: ICity
}
export interface ISetIsCityAction{
    type: ACTIONS.SET_IS_CITY,
    payload: boolean
}

export type AdressesActionsType = ICityAction | ISetIsCityAction | IAdressAction;