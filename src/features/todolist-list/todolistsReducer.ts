import { todolistAPI} from "../../api/todolist-api";
import {RequestStatusType, setAppStatusAC} from "../application/app-reducer";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
    handleServerNetworkError
} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodolistType} from "../../api/types";
import {appActions} from "../common-actions/App";


const {setAppStatus} = appActions


export const fetchTodolistsThunk = createAsyncThunk('todolists/fetchTasks', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.getTodoLists()
        let todolists = res.data
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {todolists}
    } catch (error) {
        return  handleAsyncServerNetworkError(error, thunkAPI)
    }

})
export const createTodolistTC = createAsyncThunk('todolists/createTodolist', async (title: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
   const res= await todolistAPI.createTodolist(title)
        try {
                const task = res.data.data.item
                // thunkAPI.dispatch(AddTodolistAC())
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return {title: res.data.data.item.title, id: res.data.data.item.id}

        }
        catch (error){
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }

})
export const deleteTodolistTC = createAsyncThunk('todolists/deleteTodolist', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    thunkAPI.dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'loading'}))
    const res= await   todolistAPI.deleteTodolist(todolistId)
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {id: todolistId}
})
export const updateTodolistTC = createAsyncThunk('todolists/updateTodolist', async (param: { id: string, title: string}, thunkAPI) => {
    try{
        let res =await todolistAPI.updateTodolist(param.id, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {id: param.id, title: param.title}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    }
    catch (error){
        return handleAsyncServerNetworkError(error, thunkAPI, false)
    }
})





const slice = createSlice({
    name: "todolists",
    initialState: [] as Array<TodolistDomainType> ,
    reducers: {
        RemoveTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(x => x.id === action.payload.id)
            if (index > -1) {
                state.slice(index, 1)
            }
        },
        CHANGETODOLISTFILTERAC(state, action: PayloadAction<{ filter: FilterType, id: string }>) {
            const index = state.findIndex(x => x.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(x => x.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistsThunk.fulfilled, (state, action) => {
            return action.payload.todolists.map((tl:any )=> ({...tl, filter: 'all', entityStatus:"idle"}))
        });
        builder.addCase(createTodolistTC.fulfilled, (state, action) => {
            let newTodoList: TodolistDomainType = {
                id: action.payload.id,
                title: action.payload.title,
                addedDate: "",
                order: 0,
                filter: "all",
                entityStatus: "idle"
            }
            state.unshift(newTodoList)
        });
        builder.addCase(deleteTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(x => x.id === action.payload.id)
            if (index > -1) {
                state.slice(index, 1)
            }
        });
        builder.addCase(updateTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(x => x.id === action.payload.id)
            state[index].title = action.payload.title
        });
    }
})
export const todolistsReducer = slice.reducer

export const CHANGETODOLISTFILTERAC = slice.actions.CHANGETODOLISTFILTERAC
export const changeTodolistEntityStatusAC = slice.actions.changeTodolistEntityStatusAC

export type FilterType = "all" | "complited" | "active"
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}



export const RemoveTodolistAC = slice.actions.RemoveTodolistAC




