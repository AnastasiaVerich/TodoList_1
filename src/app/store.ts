import {combineReducers} from "redux";
import {todolistsReducer} from "../features/todolist-list/";
import {tasksReducer} from "../features/todolist-list/";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "../features/application/";
import {authReducer} from "../features/auth/";
import {configureStore} from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём store
//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент

// @ts-ignore
window.store = store

export type RootReducerType=typeof rootReducer
export type AppRootType = ReturnType<RootReducerType>
