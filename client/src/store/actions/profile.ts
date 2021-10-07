import { AppDispatch } from "..";
import { ACTIONS, ISetProfileAction, IInitialState, IAuthAction } from "../../types/actions/profile";
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
function AuthSuccessAction(): IAuthAction<ACTIONS.AUTH_SUCCESS> {
    return {
        type: ACTIONS.AUTH_SUCCESS,
        payload:true
    }
}
function AuthFailAction(): IAuthAction<ACTIONS.AUTH_FAIL> {
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
                    console.log(data.user);
                    dispatch(loadCart(data.user?.cart as ICart));
                    dispatch(setAddressAction(data.user?.organization as IAddress));
                    dispatch(AuthSuccessAction())

                }else{
                    history.push("/");
                }
            }else{
                dispatch(AuthFailAction());
                history.push("/");
            }
        } catch (e: unknown) {
            history.push("/");
            localStorage.removeItem("authToken");

            const loginResponse = await profile.login();
            localStorage.setItem("authToken", loginResponse.data);
        }

    };
}


export {
    setProfileAction,
    loadData
}