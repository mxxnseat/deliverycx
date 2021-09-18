import { combineReducers } from "redux";
import address from "./address";
import cart from "./cart";
import shop from "./shop";
import profile from "./profile";

const rootReducer = combineReducers({
    cart,
    shop,
    address,
    profile
});

export default rootReducer;

