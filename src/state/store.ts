import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";
import {tasksType, TodolistType} from "../App";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootType=ReturnType<typeof rootReducer>


export const store = createStore(rootReducer)





// @ts-ignore
window.store=store