import {todolistAPI} from "../../api/todolist-api";
import {RequestStatusType} from "../application/app-reducer";
import {appCommonActions} from "../common-actions/App";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodolistType} from "../../api/types";
import {ThunkError} from "../../utils/types";


const {setAppStatus} = appCommonActions


const fetchTodolistsThunk = createAsyncThunk<{ todolists: TodolistType[] }, undefined, ThunkError>
('todolists/fetchTasks', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.getTodoLists()
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }

})
const deleteTodolistTC = createAsyncThunk<{ id: string }, string, ThunkError>('todolists/deleteTodolist', async (todolistId, {
    dispatch,
    rejectWithValue
}) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(setAppStatus({status: 'loading'}))
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'loading'}))
    const res = await todolistAPI.deleteTodolist(todolistId)
    //скажем глобально приложению, что асинхронная операция завершена
    dispatch(setAppStatus({status: 'succeeded'}))
    return {id: todolistId}
})
const createTodolistTC = createAsyncThunk<{ todolist: TodolistType }, string, ThunkError>('todolists/createTodolist', async (title, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})

const updateTodolistTC = createAsyncThunk('todolists/updateTodolist', async (param: { id: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))

    try {
        let res = await todolistAPI.updateTodolist(param.id, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {id: param.id, title: param.title}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI)
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
        builder
            .addCase(fetchTodolistsThunk.fulfilled, (state, action) => {
                return action.payload.todolists.map((tl: any) => ({...tl, filter: 'all', entityStatus: "idle"}))
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(x => x.id === action.payload.id)
                if (index > -1) {
                    state.splice(index, 1)
                } else {
                }
            })
            .addCase(createTodolistTC.fulfilled, (state, action) => {

                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })

            .addCase(updateTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(x => x.id === action.payload.id)
                state[index].title = action.payload.title
                console.log(state[index])

            });
    }
})
export const todolistsReducer = slice.reducer
export const {changeTodolistEntityStatusAC, CHANGETODOLISTFILTERAC} = slice.actions

export type FilterType = "all" | "complited" | "active"
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}




