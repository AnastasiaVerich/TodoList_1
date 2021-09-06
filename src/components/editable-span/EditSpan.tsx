import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditSpanProps = {
    value: string
    onChange: (newValue: string) => void
}

export const EditSpan = React.memo((props: EditSpanProps) => {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.value)
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (editMode
            ? <TextField onBlur={activateViewMode} value={title} onChange={onChangeTitle} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.value}</span>
    )

})