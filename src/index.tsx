import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {BrowserRouter} from "react-router-dom";
import React from "react";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
            <AppWithRedux/>
            {/*<AppWithReducer/>*/}
            {/*<App/>*/}
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
    , document.getElementById('root'));


serviceWorker.unregister();
