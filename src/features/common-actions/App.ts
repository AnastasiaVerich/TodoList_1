import {createAction} from '@reduxjs/toolkit'
import {RequestStatusType} from '../application/app-reducer'


const setAppStatus = createAction<{status: RequestStatusType}>('appCommonActions/setAppStatus')
const setAppError = createAction<{error: string | null}>('appCommonActions/setAppError')

export const appCommonActions = {
    setAppStatus,
    setAppError
}