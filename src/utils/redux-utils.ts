import {useDispatch} from "react-redux";
import {AppDispatchType} from "./types";
import {ActionCreatorsMapObject, bindActionCreators} from "redux";
import {useMemo} from "react";

// useDispatch, который диспатчит только action с указанным тип.
// в типах- все типы актион из редьюсеров всех
export const useAppDispatch=()=>useDispatch<AppDispatchType>()

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T){
    const dispatch = useAppDispatch()


    const boundActions = useMemo(()=>{
        return bindActionCreators(actions, dispatch)
    },[])
    return boundActions
}