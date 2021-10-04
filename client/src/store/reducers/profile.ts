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
                ...payload as any
            }
        }
        case ACTIONS.AUTH_SUCCESS: {
            return {...state,isAuth:payload}
        }
        case ACTIONS.AUTH_FAIL: {
            return {...state,isAuth:payload}
        }
        default: return state;
    }
}