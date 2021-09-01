import ReactDOM from 'react-dom';
import './index.css';
import AppWithRedux from "./app/AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./app/store";
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


// serviceWorker.unregister();
