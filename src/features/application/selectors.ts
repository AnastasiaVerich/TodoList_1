import {AppRootType} from "../../utils/types";

export const selectStatus=(state: AppRootType)=> state.app.status
export const selectIsInitialized = (state: AppRootType)=> state.app.isInitialized
export const selectError = (state: AppRootType)=> state.app.error