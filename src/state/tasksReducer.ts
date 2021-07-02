import {v1} from "uuid";
import {ADDTODOLIST, REMOVETODOLIST, SetTodolistsActionType} from "./todolistsReducer";
import {TaskPriorities, tasksAPI, TaskStatus, TaskType, todolistAPI} from "../api/todolist-api";
import {tasksType} from "../App";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

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

type actionType = removeTaskACType | addTaskACType | changeTaskStatusType |
    changeTaskTitleType | ADDTODOLIST | REMOVETODOLIST
    | SetTodolistsActionType | SetTasksActionType

const initialState: tasksType = {
    /* [TDid1]: [
         {id: v1(), title: "HTML", isDone: true},
         {id: v1(), title: "JS", isDone: true},
         {id: v1(), title: "React", isDone: false},
         {id: v1(), title: "Rdux", isDone: true}],
     [TDid2]: [
         {id: v1(), title: "BOOK", isDone: true},
         {id: v1(), title: "MILK", isDone: true}],
     [TDid3]: [
         {id: v1(), title: "Ruslan", isDone: true},
         {id: v1(), title: "Anastasia", isDone: true},
         {id: v1(), title: "Main", isDone: false}]*/
}

export const tasksReducer = (state: tasksType = initialState, action: actionType): tasksType => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        case "removeTask": {
            const copy = {...state}
            const tasksTL = copy[action.todolistId]
            const filter = tasksTL.filter(x => x.id !== action.taskID)
            copy[action.todolistId] = filter
            return copy
        }
        case "addTask": {
            const copy = {...state}
            const tasksTL = copy[action.todolistId]
            let newTask: TaskType = {
                id: action.taskId, title: action.title, status: TaskStatus.Complited
                , completed: true, todoListId: "", description: "", deadline: "", startDate: ""
                , addedDate: "", order: 0, priority: TaskPriorities.Hi
            }
            const newTasks = [...tasksTL, newTask]
            copy[action.todolistId] = newTasks
            return copy
        }
        case "changeTaskStatus": {
            let tasks = state[action.todolistId]
            state[action.todolistId] = tasks.map(t => t.id === action.taskID
                ? {...t, status: action.status}
                : t)
            return ({...state})
        }
        case "changeTaskTitle": {
            let tasks = state[action.todolistId]
            state[action.todolistId] = tasks.map(t => t.id === action.taskID
                ? {...t, title: action.title}
                : t)
            return ({...state})

        }
        case "ADD-TODOLIST": {
            const copy = {...state}
            copy[action.todolistId] = []
            return copy
        }
        case "REMOVE-TODOLIST": {
            const copy = {...state}
            delete copy[action.id]
            return copy
        }
        default:
            return state
    }
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}


export const removeTaskAC = ( todolistId: string, taskID: string): removeTaskACType => {
    return {type: 'removeTask', taskID, todolistId}
}

export const addTaskAC = (title: string, taskId: string,todolistId: string): addTaskACType => {
    return {type: 'addTask', title: title, todolistId,taskId }
}

export const changeTaskStatusAC = (taskID: string, status: TaskStatus, todolistId: string): changeTaskStatusType => {
    return {type: 'changeTaskStatus', taskID, status, todolistId}
}
export const changeTaskTitleAC = (todolistId: string, taskID: string, title: string): changeTaskTitleType => {
    return {type: 'changeTaskTitle', taskID, title, todolistId}
}
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
                dispatch(setAppStatusAC('succeeded'))


            })
            .catch((error)=>handleServerNetworkError(error, dispatch))

    }
}
/*export const createTasksTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {

        dispatch(setAppStatusAC('loading'))
        tasksAPI.createTasks(title, todolistId)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item.title,res.data.data.item.id, todolistId ))
                dispatch(setAppStatusAC('succeeded'))

            })
    }
}*/
export const createTasksTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.createTasks(title, todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC(res.data.data.item.title,res.data.data.item.id, todolistId ))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch((error)=>handleServerNetworkError(error, dispatch))
}

export const deleteTaskTC = (todolistId: string, taskID: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        tasksAPI.deleteTask( todolistId, taskID)
            .then((res) => {
                if(res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId,taskID ))
                dispatch(setAppStatusAC('succeeded'))}
                else {
                    handleServerAppError(res, dispatch)
                }

            })
            .catch((error)=>handleServerNetworkError(error, dispatch))

    }
}
export const updateTaskTC = (todolistId: string, taskId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        tasksAPI.updateTask( todolistId, taskId, title)
            .then((res) => {
                if(res.data.resultCode === 0) {
                    {dispatch(changeTaskTitleAC(todolistId, taskId, title))
                        dispatch(setAppStatusAC('succeeded'))}
                }
                else {
                    handleServerAppError(res, dispatch)
                }

            })
            .catch((error)=>handleServerNetworkError(error, dispatch))
    }
}




