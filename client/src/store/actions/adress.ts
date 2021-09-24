import {ACTIONS,
        IAdressAction,
        ICityAction} from "../../types/actions/adress";
import { IAddress, ICity } from "../../types/responses";


function setCityAction(payload: ICity):ICityAction{
    return {
        type: ACTIONS.SET_CITY,
        payload
    }
}
function setAddressAction(payload: IAddress): IAdressAction{
    return {
        type: ACTIONS.SET_ADRESS,
        payload
    }
}


export {
    setAddressAction,
    setCityAction,
};