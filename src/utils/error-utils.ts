import {appCommonActions} from "../features/common-actions/App";
import {ResponseType} from '../api/types'
import {AxiosError} from "axios";


type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}
// если пришел статус не тот, который ожидали
//showError = true- показывать ли ошибку в errorShackbar

export const handleAsyncServerAppError = <D>(data: ResponseType<D>,
                                             thunkAPI: ThunkAPIType,
                                             showError = true) => {
    if (showError) {
        thunkAPI.dispatch(appCommonActions.setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    thunkAPI.dispatch(appCommonActions.setAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}
//если нет сети, например
export const handleAsyncServerNetworkError = (error: AxiosError,
                                              thunkAPI: ThunkAPIType,
                                              showError = true) => {
    if (showError) {
        thunkAPI.dispatch(appCommonActions.setAppError({error: error.message ? error.message : 'Some error occurred'}))
    }
    thunkAPI.dispatch(appCommonActions.setAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}