import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType} from "./App";
import './App.css';


export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    remuve: (id: string, todolistId: string) => void
    filt: (value: FilterType, id: string) => void
    add: any
    changeStatus: (taskID: string, isDone: boolean, todolistId: string) => void
    filter: FilterType
    id: string
    remuveTodoList: (todolistid: string)=> void
}


export function TodoList(props: PropsType) {

    const addTask = () => {
        if (title.trim() === "") {
            return setError(true)
        }
        props.add(title.trim(), props.id)
        setTitle("")

    }

    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        return setError(false)
        if (e.charCode === 13) {
            addTask()
        }
    }

    const onAllClickHandler = () => props.filt("all", props.id)
    const onActiveClickHandler = () => props.filt("active", props.id)
    const onComplideClickHandler = () => props.filt("complited", props.id)
const remuveTodolist=()=> {
        props.remuveTodoList(props.id)
}

    return <div>
        <h3>
            {props.title} <button onClick={remuveTodolist}>x</button>
        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>
                +
            </button>
            {error && <div className={"error-message"}>
                Field is required
            </div>}
        </div>
        <ul>
            {props.tasks.map(
                (x) => {
                    const onClikHeader = () => props.remuve(x.id, props.id)
                    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(x.id, e.currentTarget.checked, props.id)
                    }
                    return (
                        <li key={x.id} className={x.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={x.isDone}
                                   onChange={onStatusChange}/>
                            <span>
                                {x.title}
                            </span>
                            <button onClick={onClikHeader}>
                                x
                            </button>

                        </li>
                    )
                }
            )
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>
                All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'complited' ? "active-filter" : ""}
                    onClick={onComplideClickHandler}>
                Completed
            </button>
        </div>
    </div>
}