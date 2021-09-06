import {authAPI} from "../../api/todolist-api";
import {setIsLoggedInAC} from "../auth/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appCommonActions} from "../common-actions/App";


export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, thunkAPI) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setIsLoggedInAC({value: true}))
    } else {

    }
})


export const asyncActions = {
    initializeAppTC
}


export const slice = createSlice({
    name: "app",
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false,
        isLoaded: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initializeAppTC.fulfilled, (state, action) => {
                state.isLoaded = true
            })
            .addCase(appCommonActions.setAppStatus, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(appCommonActions.setAppError, (state, action) => {
                state.error = action.payload.error
            });
    }
})


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
/////////////////////////////////////////////////////////////////////

export type SetAppErrorACType = {
    type: "APP/SET-ERROR"
    error: string | null
}

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: boolean
}
//////////////////////////////////////////////////////////////////////





