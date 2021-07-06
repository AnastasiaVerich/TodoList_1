import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./state/store";
import {tasksType} from "./AppWithRedux";
import {setAppErrorAC} from "./state/app-reducer";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(true)
    const error =useSelector<AppRootType, any>(state => state.app.error)


    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'click') {
            return dispatch(setAppErrorAC(null))
        }
        setTimeout(()=>{dispatch(setAppErrorAC(null))},0)
    }

    return (
        <Snackbar open={error != null} autoHideDuration={5000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="error">
        {error}
    </Alert>
    </Snackbar>
)
}