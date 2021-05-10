import React, {useCallback} from "react";
import {FilterType} from "./App";
import './App.css';
import {AddInputForm} from "./AddItemForm";
import {EditSpan} from "./EditSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


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
    changeStatus: (taskID: string, isDone: boolean, todolistId: string) => void
    changeTitleTask: any

    filt: (value: FilterType, id: string) => void
    add: any
    filter: FilterType
    changeTitleTodolist: any

}


export const TodoList = React.memo((props: PropsType) => {
    console.log('Todolist render')
    const remuveTodolist = () => {
        props.remuveTodoList(props.id)
    }


    const onAllClickHandler = useCallback(() => props.filt("all", props.id), [props.id, props.filt])
    const onActiveClickHandler = useCallback(() => props.filt("active", props.id), [props.id, props.filt])
    const onComplideClickHandler = useCallback(() => props.filt("complited", props.id), [props.id, props.filt])
    const addTask = useCallback((title: string) => {
        props.add(title, props.id)
    }, [props.add, props.id])
    const onchangeTitleTodolist = useCallback((title: string) => {
        props.changeTitleTodolist(title, props.id)
    }, [props.id, props.changeTitleTodolist])

    let arrayTasksForONEtodolist = props.tasks
    if (props.filter === "complited") {
        arrayTasksForONEtodolist = props.tasks.filter(t => t.isDone === true)
    }
    if (props.filter === "active") {
        arrayTasksForONEtodolist = props.tasks.filter(t => t.isDone === false)
    }

    return <div>
        <h3>
            <EditSpan onChangeTitle={onchangeTitleTodolist} title={props.title}/>
            <IconButton onClick={remuveTodolist}><Delete/></IconButton>
        </h3>
        <AddInputForm addItem={addTask}/>
        <div>
            {props.tasks.map(x => <Task remuve={props.remuve}
                          changeStatus={props.changeStatus}
                          changeTitleTask={props.changeTitleTask}
                          x={x}
                          id={props.id}
                          key={x.id}/>)
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
})


