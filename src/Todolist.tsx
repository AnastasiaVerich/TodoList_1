import React, {ChangeEvent} from "react";
import {FilterType} from "./App";
import './App.css';
import {AddInputForm} from "./AddItemForm";
import {EditSpan} from "./EditSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
type PropsType = {

    id: string
    title: string
    remuveTodoList: (todolistid: string) => void
    tasks: Array<TaskType>
    remuve: (id: string, todolistId: string) => void
    filt: (value: FilterType, id: string) => void
    add: any
    changeStatus: (taskID: string, isDone: boolean, todolistId: string) => void
    filter: FilterType
    changeTitleTask: any
    changeTitleTodolist: any

}


export function TodoList(props: PropsType) {

    const remuveTodolist = () => {
        props.remuveTodoList(props.id)
    }


    const onAllClickHandler = () => props.filt("all", props.id)
    const onActiveClickHandler = () => props.filt("active", props.id)
    const onComplideClickHandler = () => props.filt("complited", props.id)
    const addTask = (title: string) => {
        props.add(title, props.id)

    }
    const onchangeTitleTodolist = (title: string) => {
        props.changeTitleTodolist(title, props.id)
    }

    return <div>
        <h3>
            <EditSpan onChangeTitle={onchangeTitleTodolist} title={props.title}/>
            <IconButton onClick={remuveTodolist}><Delete/></IconButton>
        </h3>
        <AddInputForm addItem={addTask}/>
        <div>
            {props.tasks.map(
                (x) => {
                    const onClikHeader = () => props.remuve(x.id, props.id)
                    const onChangeTitle = (title: string) => {
                        props.changeTitleTask(x.id, title, props.id)
                    }
                    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(x.id, e.currentTarget.checked, props.id)
                    }
                    return (
                        <div key={x.id} className={x.isDone ? "is-done" : ""}>
                            <Checkbox
                                   checked={x.isDone}
                                   color={"primary"}
                                   onChange={onStatusChange}/>
                            <EditSpan title={x.title}
                                      onChangeTitle={onChangeTitle}/>
                            <IconButton onClick={onClikHeader}>
                                x
                            </IconButton>

                        </div>
                    )
                }
            )
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "text"}
                    onClick={onAllClickHandler}
                    color={"default"}>
                All
            </Button>
            <Button variant={props.filter === 'active' ? "outlined" : "text"}
                    onClick={onActiveClickHandler}
                    color={"primary"}>
                Active
            </Button>
            <Button variant={props.filter === 'complited' ? "outlined" : "text"}
                    onClick={onComplideClickHandler}
                    color={"secondary"}>
                Completed
            </Button>
        </div>
    </div>
}

