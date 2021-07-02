import {store} from "./store";
import {v1} from "uuid";
import {tasksAPI, todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {addTaskAC, setTasksAC} from "./tasksReducer";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}


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


const initialstate: Array<TodolistDomainType>=[
    /*{id: TDid1, title: "What to learn", filter: "active"},
    {id: TDid2, title: "Second Tasks", filter: "complited"},
    {id: TDid3, title: "3 Tasks", filter: "all"}*/
]
export type FilterType = "all" | "complited" | "active"
export type TodolistDomainType=TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}

type common=REMOVETODOLIST
    | ADDTODOLIST | CHANGETODOLISTTITLE
    | CHANGETODOLISTFILTER | SetTodolistsActionType

export const todolistsReducer = (state: Array<TodolistDomainType>=initialstate, action: any): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":{
           return state.filter(x => x.id !== action.id)
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map((tl:any )=> ({
                ...tl,
                filter: 'all', entityStatus:"idle"}))}
        case "ADD-TODOLIST":{
            let newTodoList: TodolistDomainType = {
                id: action.todolistId,
                title: action.title,
                addedDate: "",
                order: 0,
                filter: "all",
                entityStatus:"idle"
            }
            return ([
                newTodoList, ...state
            ])
        }
        case "CHANGE-TODOLIST-TITLE":{
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

        }

        case "CHANGE-TODOLIST-FILTER":{
            let toDo = state.find(x => x.id === action.id);
            if (toDo) {
                toDo.filter = action.filter
            }
            return [...state]
        }
        case "changeTodolistEntityStatus":{
            let toDo = state.find(x => x.id === action.id);
            if (toDo) {
                toDo.entityStatus = action.entityStatus
            }
            return [...state]
        }
        default:
            return state
    }
}

export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}


export const RemoveTodolistAC = (todolistId: string): REMOVETODOLIST => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (title: string, id: string): ADDTODOLIST => {
    return { type: 'ADD-TODOLIST', title: title, todolistId: id}
}

export const CHANGETODOLISTTITLEAC = ( id:string,title: string): CHANGETODOLISTTITLE => {
    return { type: 'CHANGE-TODOLIST-TITLE', id:id, title:title}
}

export const CHANGETODOLISTFILTERAC = (filter: FilterType, id:string): CHANGETODOLISTFILTER => {

    return { type: 'CHANGE-TODOLIST-FILTER', id:id, filter:filter}
}
export const  changeTodolistEntityStatusAC=(id: string, entityStatus: RequestStatusType)=>({
    type: "changeTodolistEntityStatus",
    id,
    entityStatus
})

export const fetchTodolistsThunk = () => {
    return(dispatch: Dispatch)=>{
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTodoLists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error)=>handleServerNetworkError(error, dispatch))

    }
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(AddTodolistAC(res.data.data.item.title, res.data.data.item.id))
                dispatch(setAppStatusAC('succeeded'))
            }  else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch((error)=>handleServerNetworkError(error, dispatch))

}
export const deleteTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId,'loading'))
        todolistAPI.deleteTodolist(todolistId)
            .then( (res) => {
                if (res.data.resultCode === 0) {
                RemoveTodolistAC(todolistId);
                dispatch(setAppStatusAC('succeeded'))}
                else {
                    handleServerAppError(res, dispatch)
                }
            })
            .catch((error)=>handleServerNetworkError(error, dispatch))

    }
}
export const updateTodolistTC = ( id:string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTodolist(id, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                CHANGETODOLISTTITLEAC(id, title)
                dispatch(setAppStatusAC('succeeded'))}
                else {
                    handleServerAppError(res, dispatch)
                }
            })
            .catch((error)=>handleServerNetworkError(error, dispatch))

    }
}
