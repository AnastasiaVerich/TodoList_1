import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";
import {store} from "./store";


export type REMOVETODOLIST={
    type: "REMOVE-TODOLIST"
    id: string
}
export type ADDTODOLIST={
    type: "ADD-TODOLIST"
    title: string
    todolistId:string
}
export type CHANGETODOLISTTITLE={
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title:string
}
export type CHANGETODOLISTFILTER={
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterType
}
export let TDid1 = v1()
export let TDid2 = v1()
export let TDid3 = v1()

const initialstate: Array<TodolistType>=[
    {id: TDid1, title: "What to learn", filter: "active"},
    {id: TDid2, title: "Second Tasks", filter: "complited"},
    {id: TDid3, title: "3 Tasks", filter: "all"}
]

type common=REMOVETODOLIST | ADDTODOLIST | CHANGETODOLISTTITLE | CHANGETODOLISTFILTER

export const todolistsReducer = (state: Array<TodolistType>=initialstate, action: common): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":{
           return state.filter(x => x.id !== action.id)
        }
        case "ADD-TODOLIST":{
            let newTodoList: TodolistType = {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }
            return ([
                newTodoList, ...state
            ])
        }
        case "CHANGE-TODOLIST-TITLE":{
            let toDo = state.find(x => x.id === action.id);
            if (toDo) {
                toDo.title = action.title
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER":{
            let toDo = state.find(x => x.id === action.id);
            if (toDo) {
                toDo.filter = action.filter
            }
            return [...state]
        }
        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): REMOVETODOLIST => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (title: string): ADDTODOLIST => {
    return { type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}

export const CHANGETODOLISTTITLEAC = (title: string, id:string): CHANGETODOLISTTITLE => {
    return { type: 'CHANGE-TODOLIST-TITLE', id:id, title:title}
}

export const CHANGETODOLISTFILTERAC = (filter: FilterType, id:string): CHANGETODOLISTFILTER => {
    return { type: 'CHANGE-TODOLIST-FILTER', id:id, filter:filter}
}
