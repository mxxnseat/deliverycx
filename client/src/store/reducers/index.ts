import { combineReducers } from "redux";
import address from "./address";
import cart from "./cart";
import shop from "./shop";

const rootReducer = combineReducers({
    cart,
    shop,
    address
});

export default rootReducer;

