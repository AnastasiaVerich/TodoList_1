import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useSelector} from "react-redux";
import {selectError} from "../../features/application/selectors";
import {useActions} from "../../utils/redux-utils";
import { appCommonActions} from "../../features/common-actions/App";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
    const error = useSelector(selectError)
    const {setAppError} = useActions(appCommonActions)

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setAppError({error: null})
    }
//если мы измение в стейте еррор не на ноль, то открывается это окно
    return (
        <Snackbar open={error != null} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    )
}
