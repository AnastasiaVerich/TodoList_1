import {authAPI} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "../common-actions/App";
import {FieldErrorType, LoginParamsType} from "../../api/types";

const {setAppStatus} = appActions

export const loginTC = createAsyncThunk('auth/login', async (param:{email: string, password: string, rememberMe: boolean, captcha: any}, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status:'loading'}))
    try{
    const res = await authAPI.auth(param.email, param.password, param.rememberMe, param.captcha)
            if (res.data.resultCode === 0){
                thunkAPI.dispatch(setAppStatus({status:'succeeded'}))
                return
            } else {
                return handleServerAppError(res, thunkAPI.dispatch)
            }
        }
        catch(error){
        return  handleServerNetworkError(error, thunkAPI.dispatch)}
})
export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status:'loading'}))
   try {
       const res = await authAPI.logout()
       if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
           return
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    }
        catch(error) {
          return   handleServerNetworkError(error, thunkAPI.dispatch)
        }
})



const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action:PayloadAction<{value:boolean}>){
            state.isLoggedIn=action.payload.value

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
export const authReducer=slice.reducer
export const setIsLoggedInAC =slice.actions.setIsLoggedInAC
