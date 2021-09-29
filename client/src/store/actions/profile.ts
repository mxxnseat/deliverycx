import { AppDispatch } from "..";
import { ACTIONS, ISetProfileAction, IInitialState } from "../../types/actions/profile";
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
function loadData() {
    return async (dispatch: AppDispatch) => {
        try {
            const loginResponse = await profile.login();
            
            localStorage.setItem("authToken", loginResponse.data);

            const {data, status} = await profile.getProfile();

            if(status === 200){
                if(data.isAuth){
                    dispatch(loadCart(data.user?.cart as ICart));
                    dispatch(setAddressAction(data.user?.organization as IAddress))

                    history.push("/");
                }
            }else{
                throw Error();
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