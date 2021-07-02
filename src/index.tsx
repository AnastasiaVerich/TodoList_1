import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AppWithReducer from "./AppWithReducer";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppWithRedux/>
            {/*<AppWithReducer/>*/}
            {/*<App/>*/}
        </Provider>
    </React.StrictMode>
    , document.getElementById('root'));


serviceWorker.unregister();
