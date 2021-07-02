import {addTaskACType} from "./tasksReducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type SetAppErrorACType = {
    type: "APP/SET-ERROR"
    error: string | null
}


const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}

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


type ActionsType = any