import {asyncActions, slice} from "./app-reducer";
import * as appSelectors from './selectors'


const appActions ={
    ...slice.actions,
    ...asyncActions
}

const appReducer= slice.reducer

export{
    appActions,
    appReducer,
    appSelectors

}