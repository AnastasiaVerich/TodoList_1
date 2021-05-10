import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditSpan} from "./EditSpan";
import {TaskType} from "./Todolist";

type TASKStype = {
    remuve: (id: string, todolistId: string) => void
    changeStatus: (taskID: string, isDone: boolean, todolistId: string) => void
    changeTitleTask: any
    x: TaskType//task
    id: string//todolistID

}
export const Task = React.memo((props: TASKStype) => {
    const onClikHeader = () => props.remuve(props.x.id, props.id)
    const onChangeTitle = useCallback((title: string) => {
        props.changeTitleTask(props.x.id, title, props.id)
    },[props.x.id,props.changeTitleTask, props.id])
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.x.id, e.currentTarget.checked, props.id)
    }
    return (
        <div key={props.x.id} className={props.x.isDone ? "is-done" : ""}>
            <Checkbox
                checked={props.x.isDone}
                color={"primary"}
                onChange={onStatusChange}/>
            <EditSpan title={props.x.title}
                      onChangeTitle={onChangeTitle}/>
            <IconButton onClick={onClikHeader}>
                x
            </IconButton>

        </div>)
})