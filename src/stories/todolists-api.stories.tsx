import React, {useEffect, useState} from 'react'
import axios from "axios";
import {tasksAPI, todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '603ef8c0-4933-4294-ab5f-b170d3ebe6d8'
    }
}


export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
todolistAPI.getTodoLists()
            .then((res) => {
                setState(res.data.map((x:any)=>{ return x}));
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('настенька')
            .then( (res) => {
            setState(res.data);
        } )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '984fdb27-8541-4d75-ae32-ed1b98c8636';
        todolistAPI.deleteTodolist(todolistId)
            .then( (res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '222242b1-75d0-4d67-8085-1e35b5094cee'
        todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
            .then((res) => {

                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '7a30aa25-8e86-4b53-b376-15e75e237c0f';
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '7a30aa25-8e86-4b53-b376-15e75e237c0f';
        tasksAPI.createTasks("Настя", todolistId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask= () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '7a30aa25-8e86-4b53-b376-15e75e237c0f';
        const taskID = "aec432d1-2490-4018-ac40-813881f67641";
        tasksAPI.deleteTask(todolistId, taskID)
            .then( (res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '7a30aa25-8e86-4b53-b376-15e75e237c0f'
        const taskId ='d503e538-30d1-4e9c-9dad-9bc990b721d4'
        const title= " мяу"
tasksAPI.updateTask(todolistId, taskId, title )
    .then((res) => {
        setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

