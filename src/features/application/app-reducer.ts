import {Dispatch} from "redux";
import {authAPI} from "../../api/todolist-api";
import {setIsLoggedInAC} from "../auth/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type SetAppErrorACType = {
    type: "APP/SET-ERROR"
    error: string | null
}


const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
    isLoaded: false
}


const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
           state.error= action.payload.error
        },
        setIsInitializeddInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized= action.payload.value
        },
        setIsLoggedMeAC(state, action: PayloadAction<{value: boolean }>) {
            state.isLoaded= action.payload.value
        }
    }
})
export const setAppStatusAC =slice.actions.setAppStatusAC
export const setAppErrorAC =slice.actions.setAppErrorAC
export const setIsLoggedMeAC =slice.actions.setIsLoggedMeAC
export const setIsInitializeddInAC =slice.actions.setIsInitializeddInAC

export const appReducer=slice.reducer
/*export const appReducer1 = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "setIsInitializeddInAC":
            return {... state, isInitialized: action.value}
        case "SET-IS-LOGGED-me":
            return {...state, isLoaded: action.value}

        default:
            return state
    }
}*/
/*
export const setAppStatusAC = (status: string) => {
    return {type: "APP/SET-STATUS", status}
}
export const setAppErrorAC = (error: string | null): SetAppErrorACType => {
    return {type: "APP/SET-ERROR", error}
}
export const setIsInitializeddInAC = (value: boolean) =>
    ({type: 'setIsInitializeddInAC', value} as const)
export const setIsLoggedMeAC = (value: boolean) =>
    ({type: 'SET-IS-LOGGED-me', value} as const)

*/


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsInitializeddInAC({value:true}))
            dispatch(setIsLoggedInAC({value: true}))
        } else {
            dispatch(setIsLoggedMeAC({value:true}))
        }
    })
}

