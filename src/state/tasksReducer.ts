import {TaskPriorities, tasksAPI, TaskStatus, TaskType, todolistAPI} from "../api/todolist-api";
import {tasksType} from "../App";
import {Dispatch} from "redux";
import { setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AddTodolistAC, RemoveTodolistAC, setTodolistsAC} from "./todolistsReducer";
import {action} from "@storybook/addon-actions";

/*
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

export type removeTaskACType = {
    type: "removeTask"
    todolistId: string
    taskID: string
}
export type addTaskACType = {
    type: "addTask"
    title: string
    todolistId: string
    taskId: string
}
export type changeTaskStatusType = {
    type: "changeTaskStatus"
    todolistId: string
    status: TaskStatus
    taskID: string
}
export type changeTaskTitleType = {
    type: "changeTaskTitle"
    todolistId: string
    title: string
    taskID: string
}
*/



const initialState: tasksType = {
}
const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        setTasksAC(state, action:PayloadAction<{ tasks: Array<TaskType>,todolistId: string}>){
            state[action.payload.todolistId]=action.payload.tasks
        },
        removeTaskAC(state, action:PayloadAction<{todolistId: string, taskID: string}>){
            const tasks=state[action.payload.todolistId]
            const index= tasks.findIndex(x => x.id === action.payload.taskID)
            if(index>-1){
                tasks.splice(index,1)
            }
        },
        addTaskAC(state, action:PayloadAction<{title: string, taskId: string,todolistId: string}>){
             let newTask: TaskType = {
                 id: action.payload.taskId, title: action.payload.title, status: TaskStatus.Complited
                 , completed: true, todoListId: "", description: "", deadline: "", startDate: ""
                 , addedDate: "", order: 0, priority: TaskPriorities.Hi
             }
            state[action.payload.todolistId].unshift(newTask)

        },
        changeTaskStatusAC(state, action:PayloadAction<{ taskID: string, status: TaskStatus, todolistId: string}>){
            const task=state[action.payload.todolistId]
            const index = task.findIndex(t=>t.id === action.payload.taskID)
            if(index>-1){
                task[index].status=action.payload.status
            }
        },
        changeTaskTitleAC(state, action:PayloadAction<{todolistId: string, taskID: string, title: string}>){
            const task=state[action.payload.todolistId]
            const index = task.findIndex(t=>t.id === action.payload.taskID)
            if(index>-1){
                task[index].title=action.payload.title
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(AddTodolistAC,(state, action)=>{
            state[action.payload.id]=[]
        });
        builder.addCase(RemoveTodolistAC,(state, action)=>{
            delete state[action.payload.id]
        });
        builder.addCase(setTodolistsAC,(state, action)=>{
            action.payload.todolists.forEach((tl:any)=>{
                state[tl.id]=[]
            })
        });
    }
/*:{
        [setTodolistsAC.type]: (state, action:PayloadAction<{}>)=>{},
        [AddTodolistAC.type]: (state, action:PayloadAction<{}>)=>{},
        [RemoveTodolistAC.type]: (state, action:PayloadAction<{}>)=>{}
    }*/
})
export const setTasksAC =slice.actions.setTasksAC
export const removeTaskAC =slice.actions.removeTaskAC
export const addTaskAC =slice.actions.addTaskAC
export const changeTaskStatusAC =slice.actions.changeTaskStatusAC
export const changeTaskTitleAC =slice.actions.changeTaskTitleAC

export const tasksReducer=slice.reducer


// export const addTaskAC = (title: string, taskId: string,todolistId: string): addTaskACType => {
//     return {type: 'addTask', title: title, todolistId,taskId }
// }
// export const changeTaskStatusAC = (taskID: string, status: TaskStatus, todolistId: string): changeTaskStatusType => {
//     return {type: 'changeTaskStatus', taskID, status, todolistId}
// }
// export const changeTaskTitleAC = (todolistId: string, taskID: string, title: string): changeTaskTitleType => {
//     return {type: 'changeTaskTitle', taskID, title, todolistId}
// }

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:'loading'}))
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC({tasks:tasks, todolistId:todolistId})
                dispatch(action)
                dispatch(setAppStatusAC({status:'succeeded'}))


            })
            .catch((error)=>handleServerNetworkError(error, dispatch))

    }
}
export const createTasksTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    tasksAPI.createTasks(title, todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC({title:res.data.data.item.title, taskId:res.data.data.item.id, todolistId:todolistId} ))
                dispatch(setAppStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch((error)=>handleServerNetworkError(error, dispatch))
}
export const deleteTaskTC = (todolistId: string, taskID: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:'loading'}))
        tasksAPI.deleteTask( todolistId, taskID)
            .then((res) => {
                if(res.data.resultCode === 0) {
                dispatch(removeTaskAC({todolistId: todolistId, taskID:taskID}))
                dispatch(setAppStatusAC({status:'succeeded'}))}
                else {
                    handleServerAppError(res, dispatch)
                }

            })
            .catch((error)=>handleServerNetworkError(error, dispatch))

    }
}
export const updateTaskTC = (todolistId: string, taskId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:'loading'}))
        tasksAPI.updateTask( todolistId, taskId, title)
            .then((res) => {
                if(res.data.resultCode === 0) {
                    {dispatch(changeTaskTitleAC({todolistId:todolistId,taskID: taskId,title: title}))
                        dispatch(setAppStatusAC({status:'succeeded'}))}
                }
                else {
                    handleServerAppError(res, dispatch)
                }

            })
            .catch((error)=>handleServerNetworkError(error, dispatch))
    }
}




