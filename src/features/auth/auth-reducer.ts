import {authAPI} from "../../api/todolist-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appCommonActions} from "../common-actions/App";
import {FieldErrorType, LoginParamsType} from "../../api/types";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";

const {setAppStatus} = appCommonActions

export const loginTC = createAsyncThunk<undefined, LoginParamsType,
    { rejectValue: { errors: string[], fieldsErrors?: FieldErrorType[] } }>
('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})

export const asyncActions = {
    loginTC,
    logoutTC
}

export const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value

        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginTC.fulfilled, (state) => {
                state.isLoggedIn = true
            })
            .addCase(logoutTC.fulfilled, (state) => {
                state.isLoggedIn = false
            })
    }
})
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC
