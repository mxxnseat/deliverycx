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

            const { data } = await profile.getProfile();

            if (data.isAuth) {
                dispatch(setAddressAction(data.user?.organization as IAddress));

                dispatch(setProfileAction({
                    isAuth: true,
                    isVerify: data.user?.isVerify as boolean,
                    username: data.user?.username as string,
                }));

                dispatch(loadCart(data.user?.cart as ICart[]));
            } else {
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