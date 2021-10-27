import "./scss/index.scss";

import React from 'react';
import {Provider} from "react-redux";
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Router } from 'react-router-dom';
import {createBrowserHistory} from "history";
import Store from "./store";

export const history = createBrowserHistory();
console.log(process.env.test);
ReactDOM.render(
  <Provider store={Store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

