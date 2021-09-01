import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../app/store";
import {tasksType} from "../../app/AppWithRedux";
import {setAppErrorAC} from "../../features/application/app-reducer";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(true)
    const error =useSelector<AppRootType, any>(state => state.app.error)


    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'click') {
            return dispatch(setAppErrorAC({error:null}))
        }
        setTimeout(()=>{dispatch(setAppErrorAC({error:null}))},0)
    }

    return (
        <Snackbar open={error != null} autoHideDuration={5000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="error">
        {error}
    </Alert>
    </Snackbar>
)
}
