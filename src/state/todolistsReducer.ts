import {store} from "./store";
import {v1} from "uuid";
import {tasksAPI, todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}


// export type REMOVETODOLIST={
//     type: "REMOVE-TODOLIST"
//     id: string
// }
// export type ADDTODOLIST={
//     type: "ADD-TODOLIST"
//     title: string
//     todolistId:string
// }
// export type CHANGETODOLISTTITLE={
//     type: "CHANGE-TODOLIST-TITLE"
//     id: string
//     title:string
// }
// export type CHANGETODOLISTFILTER={
//     type: "CHANGE-TODOLIST-FILTER"
//     id: string
//     filter: FilterType
// }


const initialstate: Array<TodolistDomainType>=[]
export type FilterType = "all" | "complited" | "active"
export type TodolistDomainType=TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}
const slice = createSlice({
    name: "todolists",
    initialState: initialstate,
    reducers: {
        setTodolistsAC(state, action:PayloadAction<{todolists: Array<TodolistType>}>){
            return action.payload.todolists.map((tl:any )=> ({...tl, filter: 'all', entityStatus:"idle"}))
        },
        RemoveTodolistAC(state, action:PayloadAction<{id: string}>){
           const index= state.findIndex(x => x.id === action.payload.id)
            if(index>-1){
                state.slice(index,1)
            }
        },
        AddTodolistAC(state, action:PayloadAction<{title: string, id: string}>){
            let newTodoList: TodolistDomainType = {
                id: action.payload.id,
                title: action.payload.title,
                addedDate: "",
                order: 0,
                filter: "all",
                entityStatus:"idle"
            }
            state.unshift(newTodoList)
        },
        CHANGETODOLISTTITLEAC(state, action:PayloadAction<{id:string,title: string}>){
            const index= state.findIndex(x => x.id === action.payload.id)
            state[index].title=action.payload.title

        },
        CHANGETODOLISTFILTERAC(state, action:PayloadAction<{filter: FilterType, id:string}>){
            const index= state.findIndex(x => x.id === action.payload.id)
            state[index].filter=action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action:PayloadAction<{id: string, entityStatus: RequestStatusType}>){
            const index= state.findIndex(x => x.id === action.payload.id)
            state[index].entityStatus=action.payload.entityStatus
        }
    }
})

export const todolistsReducer =slice.reducer
// export const _todolistsReducer = (state: Array<TodolistDomainType>=initialstate, action: any): Array<TodolistDomainType> => {
//     switch (action.type) {
//         case "REMOVE-TODOLIST":{
//            return state.filter(x => x.id !== action.id)
//         }
//         case 'SET-TODOLISTS': {
//             return action.todolists.map((tl:any )=> ({
//                 ...tl,
//                 filter: 'all', entityStatus:"idle"}))}
//         case "ADD-TODOLIST":{
//             let newTodoList: TodolistDomainType = {
//                 id: action.todolistId,
//                 title: action.title,
//                 addedDate: "",
//                 order: 0,
//                 filter: "all",
//                 entityStatus:"idle"
//             }
//             return ([
//                 newTodoList, ...state
//             ])
//         }
//         case "CHANGE-TODOLIST-TITLE":{
//             return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
//
//         }
//
//         case "CHANGE-TODOLIST-FILTER":{
//             let toDo = state.find(x => x.id === action.id);
//             if (toDo) {
//                 toDo.filter = action.filter
//             }
//             return [...state]
//         }
//         case "changeTodolistEntityStatus":{
//             let toDo = state.find(x => x.id === action.id);
//             if (toDo) {
//                 toDo.entityStatus = action.entityStatus
//             }
//             return [...state]
//         }
//         default:
//             return state
//     }
// }

export const setTodolistsAC =slice.actions.setTodolistsAC
export const RemoveTodolistAC =slice.actions.RemoveTodolistAC
export const AddTodolistAC =slice.actions.AddTodolistAC
export const CHANGETODOLISTTITLEAC =slice.actions.CHANGETODOLISTTITLEAC
export const CHANGETODOLISTFILTERAC =slice.actions.CHANGETODOLISTFILTERAC
export const changeTodolistEntityStatusAC =slice.actions.changeTodolistEntityStatusAC



export const fetchTodolistsThunk = () => {
    return(dispatch: Dispatch)=>{
        dispatch(setAppStatusAC({status:'loading'}))
        todolistAPI.getTodoLists()
            .then((res) => {
                dispatch(setTodolistsAC({todolists:res.data}))
                dispatch(setAppStatusAC({status:'succeeded'}))
            })
            .catch((error)=>handleServerNetworkError(error, dispatch))

    }
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(AddTodolistAC({title:res.data.data.item.title, id:res.data.data.item.id}))
                dispatch(setAppStatusAC({status:'succeeded'}))
            }  else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch((error)=>handleServerNetworkError(error, dispatch))

}
export const deleteTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:'loading'}))
        dispatch(changeTodolistEntityStatusAC({id:todolistId, entityStatus:'loading'}))
        todolistAPI.deleteTodolist(todolistId)
            .then( (res) => {
                if (res.data.resultCode === 0) {
                RemoveTodolistAC({id:todolistId});
                dispatch(setAppStatusAC({status:'succeeded'}))}
                else {
                    handleServerAppError(res, dispatch)
                }
            })
            .catch((error)=>handleServerNetworkError(error, dispatch))

    }
}
export const updateTodolistTC = ( id:string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:'loading'}))
        todolistAPI.updateTodolist(id, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                CHANGETODOLISTTITLEAC({id:id, title:title})
                dispatch(setAppStatusAC({status:'succeeded'}))}
                else {
                    handleServerAppError(res, dispatch)
                }
            })
            .catch((error)=>handleServerNetworkError(error, dispatch))

    }
}
