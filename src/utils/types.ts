import {rootReducer, store} from "../app/store";
import {FieldErrorType} from "../api/types";


export type RootReducerType = typeof rootReducer
//AppRootStateType
export type   AppRootType= ReturnType<RootReducerType>
export type AppDispatchType = typeof store.dispatch
export type ThunkError={rejectValue:{errors: string[], fieldsErrors?:FieldErrorType[]}}


