import {asyncActions, slice} from "./auth-reducer";
import { Login } from "./Login";
import * as authSelectors from './selectors'


const authActions = {
    ...slice.actions,
    ...asyncActions
}

const authReducer= slice.reducer

export{
    authActions,
    authReducer,
    Login,
    authSelectors
}