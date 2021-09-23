import { AdressesActionsType, ACTIONS, IInitialState } from "../../types/actions/adress";
import { IAddress, ICity } from "../../types/responses";
import {createReducer } from "@reduxjs/toolkit";

const initialState: IInitialState = {
    city: {} as ICity,
    address: {} as IAddress,
};



export default (state = initialState, action: AdressesActionsType): IInitialState => {
    switch (action.type) {
        case ACTIONS.SET_CITY: {
            return {
                ...state,
                city: action.payload
            }
        }
        case ACTIONS.SET_ADRESS: {
            return {
                ...state,
                address: {
                    ...action.payload
                }
            }
        }
        default: return state;
    }
}