import {FilterType, tasksType, TodolistType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {ADDTODOLIST, REMOVETODOLIST} from "./todolistsReducer";


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

export const tasksReducer = (state: tasksType, action: actionType): tasksType => {
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
            const copy={...state}
            const tasksTL=copy[action.todolistId]
            const change=tasksTL.find(x=>x.id===action.taskID)
            if(change) change.isDone=action.isDone
            return copy
        }
        case "changeTaskTitle": {
            const copy={...state}
            const tasksTL=copy[action.todolistId]
            const change=tasksTL.find(x=>x.id===action.taskID)
           if(change) change.title=action.title
            return copy
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
            throw new Error("I don't understand this type")
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



