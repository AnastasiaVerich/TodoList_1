import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditSpanProps = {
    title: string
    onChangeTitle:any
}

export function EditSpan(props: EditSpanProps) {
let[editMode,setEditMode]=useState(true)
    let[title,setTitle]=useState("")
    const change=()=>{
    setEditMode(false)
        setTitle(props.title)
     }
    const bloor=()=>{
        setEditMode(true)
        props.onChangeTitle(title)
    }
    const onChangeTitle=(e:ChangeEvent<HTMLInputElement>)=>{ setTitle(e.currentTarget.value)}
    return (editMode ?
            <span onDoubleClick={change} >{props.title}</span> :
            <TextField onBlur={bloor} value={title} onChange={onChangeTitle} autoFocus/>
    )

}