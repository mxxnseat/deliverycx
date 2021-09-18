import {IInitialState, ACTIONS, IActionsType} from "../../types/actions/profile";


const initialState: IInitialState = {
    isAuth: false,
    isVerify: false,
    username: null,
    name:  null,
    phone: null,
}


export default (state = initialState, {type, payload}: IActionsType)=>{
    switch(type){
        case ACTIONS.SET_PROFILE: {
            return {
                ...state,
                ...payload
            }
        }
        default: return state;
    }
}