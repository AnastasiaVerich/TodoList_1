import ReactDOM from 'react-dom';
import './index.css';
import App from "./app/App";
import {Provider} from "react-redux";
import {store} from "./app/store";
import {BrowserRouter} from "react-router-dom";
import React from "react";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
            <App/>
            {/*<AppWithReducer/>*/}
            {/*<App/>*/}
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
    , document.getElementById('root'));


// serviceWorker.unregister();
