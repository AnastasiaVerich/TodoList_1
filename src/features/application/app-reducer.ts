import {authAPI} from "../../api/todolist-api";
import {setIsLoggedInAC} from "../auth/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "../common-actions/App";

const {setAppStatus} = appActions

export const initializeAppTC= createAsyncThunk('app/initializeApp',async (param, thunkAPI) => {
   const res= await authAPI.me()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({value: true}))
        } else {

        }
})



const slice = createSlice({
    name: "app",
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false,
        isLoaded: false
    },
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
           state.error= action.payload.error
        }
    },
    extraReducers: (builder) => {
        builder.addCase(initializeAppTC.fulfilled, (state, action) => {
            state.isLoaded= true
        });
        builder.addCase(appActions.setAppStatus, (state, action) => {
            state.status = action.payload.status
        });
        builder.addCase(appActions.setAppError, (state, action) => {
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
//////////////////////////////////////////////////////////////////////
export const setAppStatusAC =slice.actions.setAppStatusAC
export const setAppErrorAC =slice.actions.setAppErrorAC

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: boolean
}
export const appReducer=slice.reducer





