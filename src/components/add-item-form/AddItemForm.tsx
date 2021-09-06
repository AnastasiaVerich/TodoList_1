import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";


export type AddItemFormSubmitHelperType = { setError: (error: string) => void, setTitle: (title: string) => void }

export  type AddItemFormPropsType = {
    addItem: (title: string, helper: AddItemFormSubmitHelperType) => void
    disabled?: boolean
}

export const AddInputForm = React.memo((props: AddItemFormPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = async () => {
        if (title.trim() !== "") {
            props.addItem(title, {setError, setTitle})
        } else {
            setError('Title is Required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            return setError(null)
        }
        if (e.charCode === 13) {
            addItemHandler()
        }
    }


    return (<div>
            <TextField
                variant={"outlined"}
                disabled={props.disabled}
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                label={"Title"}
                helperText={error}
            />
            <IconButton onClick={addItemHandler} color={"primary"} disabled={props.disabled}>
                +
            </IconButton>
        </div>
    )
})