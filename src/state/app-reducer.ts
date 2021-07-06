import {addTaskACType} from "./tasksReducer";
import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "./auth-reducer";

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

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
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
}
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



export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsInitializeddInAC(true))
            dispatch(setIsLoggedInAC(true))
        } else {
            dispatch(setIsLoggedMeAC(true))
        }
    })
}

type ActionsType = any