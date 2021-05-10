import {FilterType, tasksType, TodolistType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {ADDTODOLIST, REMOVETODOLIST, TDid1, TDid2, TDid3} from "./todolistsReducer";


export type removeTaskACType={
    type: "removeTask"
    todolistId: string
    taskID: string
}
export type addTaskACType={
    type: "addTask"
    title: string
    todolistId: string
}
export type changeTaskStatusType={
    type: "changeTaskStatus"
    todolistId: string
    isDone: boolean
    taskID: string
}
export type changeTaskTitleType={
    type: "changeTaskTitle"
    todolistId: string
    title: string
    taskID: string
}

type actionType=removeTaskACType | addTaskACType | changeTaskStatusType |
    changeTaskTitleType | ADDTODOLIST | REMOVETODOLIST

const initialState: tasksType= {
   /* [TDid1]: [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Rdux", isDone: true}],
    [TDid2]: [
        {id: v1(), title: "BOOK", isDone: true},
        {id: v1(), title: "MILK", isDone: true}],
    [TDid3]: [
        {id: v1(), title: "Ruslan", isDone: true},
        {id: v1(), title: "Anastasia", isDone: true},
        {id: v1(), title: "Main", isDone: false}]*/
}

export const tasksReducer = (state: tasksType= initialState, action: actionType): tasksType => {
    switch (action.type) {
        case "removeTask":{
            const copy={...state}
            const tasksTL=copy[action.todolistId]
            const filter=tasksTL.filter(x=>x.id!==action.taskID)
            copy[action.todolistId]=filter
            return copy
        }
        case "addTask":{
            const copy={...state}
            const tasksTL=copy[action.todolistId]
            let newTask: TaskType={ id: v1(), title: action.title, isDone: true}
            const newTasks=[...tasksTL, newTask]
            copy[action.todolistId]=newTasks
            return copy
        }
        case "changeTaskStatus": {
            let tasks=state[action.todolistId]
            state[action.todolistId]=tasks.map(t=>t.id===action.taskID
            ? {...t, isDone: action.isDone}
            : t)
            return ({...state})
        }
        case "changeTaskTitle": {
            let tasks=state[action.todolistId]
            state[action.todolistId]=tasks.map(t=>t.id===action.taskID
                ? {...t, title: action.title}
                : t)
            return ({...state})

        }
        case "ADD-TODOLIST":{
            const copy={...state}
            copy[action.todolistId]=[]
            return copy
        }
        case "REMOVE-TODOLIST":{
            const copy={...state}
            delete copy[action.id]
            return copy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistId: string): removeTaskACType => {
    return { type: 'removeTask',taskID,  todolistId}
}

export const addTaskAC = (title: string, todolistId: string): addTaskACType => {
    return { type: 'addTask', title: title,  todolistId}
}

export const changeTaskStatusAC = (taskID: string, isDone:boolean, todolistId: string): changeTaskStatusType => {
    return { type: 'changeTaskStatus', taskID, isDone, todolistId}
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistId: string): changeTaskTitleType => {
    return { type: 'changeTaskTitle', taskID, title, todolistId}
}



