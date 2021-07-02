import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";
import thunk from "redux-thunk";
import thunkMiddleware from 'redux-thunk'

import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export type AppRootType=ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store=store