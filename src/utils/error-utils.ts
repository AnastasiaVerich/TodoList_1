import { setAppErrorAC, SetAppErrorACType, setAppStatusAC } from '../state/app-reducer';
import { Dispatch } from 'redux';
import {ResponseType} from '../api/todolist-api'

// generic function
export const handleServerAppError = <T>(data: any, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC({error:'Some error occurred'}))
    }
    dispatch(setAppStatusAC({ status:'failed'}))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC({error:error.message}))
    dispatch(setAppStatusAC({status:'failed'}))
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorACType | any>