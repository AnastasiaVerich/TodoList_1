import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";

export  type inputFormType = {
    addItem: (title: string) => void
    disabled?: any
}

export const  AddInputForm= React.memo((props: inputFormType)=> {

    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error!==false){return setError(false)}
        if (e.charCode === 13) {
            addTask()
        }
    }

    const addTask = () => {
        if (title.trim() === "") {
            return setError(true)
        }
        props.addItem(title.trim())
        setTitle("")

    }

    return (<div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                label={"Title"}
                helperText={error}
            />
            <IconButton onClick={addTask}  color={"primary"} disabled={props.disabled}>
                +
            </IconButton>
        </div>
    )
})