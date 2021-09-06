import {todolistAPI} from "../../api/todolist-api";
import {RequestStatusType} from "../application/app-reducer";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodolistType} from "../../api/types";
import {appCommonActions} from "../common-actions/App";
import {ThunkError} from "../../utils/types";


const {setAppStatus} = appCommonActions


const fetchTodolistsThunk = createAsyncThunk<{ todolists: TodolistType[] }, undefined, ThunkError>
('todolists/fetchTasks', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.getTodoLists()
        let todolists = res.data
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {todolists}
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }

})
const deleteTodolistTC = createAsyncThunk<{ id: string }, string, ThunkError>('todolists/deleteTodolist', async (todolistId, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    thunkAPI.dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'loading'}))
    try {
        const res = await todolistAPI.deleteTodolist(todolistId)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {id: todolistId}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI, false)

        }

    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI, false)

    }

})
const createTodolistTC = createAsyncThunk<{ todolist: TodolistType }, string, ThunkError>('todolists/createTodolist', async (title, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI, false)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI, false)
    }
})

const updateTodolistTC = createAsyncThunk('todolists/updateTodolist', async (param: { id: string, title: string }, thunkAPI) => {
    try {
        let res = await todolistAPI.updateTodolist(param.id, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {id: param.id, title: param.title}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI, false)
    }
})
export const asyncActions = {
    updateTodolistTC,
    createTodolistTC,
    deleteTodolistTC,
    fetchTodolistsThunk
}


export const slice = createSlice({
    name: "todolists",
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
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
            return action.payload.todolists.map((tl: any) => ({...tl, filter: 'all', entityStatus: "idle"}))
        })
            .addCase(createTodolistTC.fulfilled, (state, action) => {

                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(x => x.id === action.payload.id)
                if (index > -1) {
                    state.slice(index, 1)
                }
            })
            .addCase(updateTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(x => x.id === action.payload.id)
                state[index].title = action.payload.title
            });
    }
})
export const todolistsReducer = slice.reducer
export const {changeTodolistEntityStatusAC, CHANGETODOLISTFILTERAC}=slice.actions

export type FilterType = "all" | "complited" | "active"
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}




