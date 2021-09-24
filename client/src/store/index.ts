import { createStore, applyMiddleware } from "redux";
import { push, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from "history";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

import reducer from "./reducers";

import isEqual from "lodash/isEqual";


const history = createBrowserHistory();
const routerMiddlewareInst = routerMiddleware(history);


const store = createStore(reducer, 
    composeWithDevTools({})
    (applyMiddleware(
        routerMiddlewareInst,
        thunk
    ))
)

export default store;
export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;