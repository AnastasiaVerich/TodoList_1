import ReactDOM from 'react-dom';
import './index.css';
import App from "./app/App";
import {Provider} from "react-redux";
import {store} from "./app/store";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import * as serviceWorker from './serviceWorker'


ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>

            <App/>

            </BrowserRouter>
        </Provider>
    , document.getElementById('root'));


serviceWorker.unregister();
