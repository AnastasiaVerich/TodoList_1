import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "../features/todolist-list/todolistsReducer";
import {tasksReducer} from "../features/todolist-list/tasksReducer";
import thunk from "redux-thunk";
import thunkMiddleware from 'redux-thunk'

import {appReducer} from "../features/application/app-reducer";
import {authReducer} from "../features/auth/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})
export type RootReducerType=typeof rootReducer

export type AppRootType = ReturnType<RootReducerType>
//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})


// @ts-ignore
window.store = store