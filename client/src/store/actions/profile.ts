import { AppDispatch } from "..";
import { ACTIONS, ISetProfileAction, IInitialState, IAuthSuccessAction, IAuthFailAction } from "../../types/actions/profile";
import { loadCart } from "../actions/cart";
import profile from '../../api/Profile';
import { setAddressAction } from "./adress";
import { IAddress, ICart } from "../../types/responses";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();


function setProfileAction(payload: IInitialState): ISetProfileAction {
    return {
        type: ACTIONS.SET_PROFILE,
        payload
    }
}
function AuthSuccessAction(): IAuthSuccessAction {
    return {
        type: ACTIONS.AUTH_SUCCESS,
        payload:true
    }
}
function AuthFailAction(): IAuthFailAction {
    return {
        type: ACTIONS.AUTH_FAIL,
        payload:false
    }
}

function loadData() {
    return async (dispatch: AppDispatch) => {
        try {
            const loginResponse = await profile.login();
            
            localStorage.setItem("authToken", loginResponse.data);

            const { data, status } = await profile.getProfile();
            

            if(status === 200){
                if (data.isAuth) {
                    dispatch(AuthSuccessAction())
                    dispatch(loadCart(data.user?.cart as ICart));
                    dispatch(setAddressAction(data.user?.organization as IAddress))
                    //history.push("/");
                }
            }else{
                dispatch(AuthFailAction());
            }
        } catch (e: unknown) {
            history.push("/");
        }

    };
}


export {
    setProfileAction,
    loadData
}