import {asyncActions as todolistsAsyncActions, slice  as todolistsSlice} from "./todolistsReducer";
import {asyncActions as tasksAsyncActions, slice as tasksSlice} from "./tasksReducer";
import TodolistList from "./TodolistList";



const todolistsActions ={
    ...todolistsAsyncActions,
    ...todolistsSlice.actions
}

const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions
}

const todolistsReducer = todolistsSlice.reducer
const tasksReducer = tasksSlice.reducer

export {
    tasksActions,
    todolistsActions,
    TodolistList,
    todolistsReducer,
    tasksReducer
}