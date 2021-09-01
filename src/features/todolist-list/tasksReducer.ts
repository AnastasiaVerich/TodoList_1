import {setAppStatusAC} from "../application/app-reducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createTodolistTC, fetchTodolistsThunk, RemoveTodolistAC,} from "./todolistsReducer";
import {TaskPriorities, TaskStatus, TaskType} from "../../api/types";
import {tasksAPI} from "../../api/todolist-api";
import {appActions} from "../common-actions/App";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";

const {setAppStatus} = appActions


export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await tasksAPI.getTasks(todolistId)
        const tasks = res.data.items
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {tasks, todolistId}
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
export const createTasksTC = createAsyncThunk('tasks/createTasks', async (param: { title: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        let res = await tasksAPI.createTasks(param.title, param.todolistId)
        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return res.data.data.item
        } else {
            handleAsyncServerAppError(res.data, thunkAPI, false)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err) {
        return handleAsyncServerNetworkError(err, thunkAPI, false)
    }
})
export const deleteTaskTC = createAsyncThunk('tasks/deleteTask', async (param: { todolistId: string, taskID: string }, thunkAPI) => {
    const res = await tasksAPI.deleteTask(param.todolistId, param.taskID)
    return {todolistId: param.todolistId, taskID: param.taskID}


})
export const updateTaskTC = createAsyncThunk('tasks/updateTask', (param: { todolistId: string, taskId: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    return tasksAPI.updateTask(param.todolistId, param.taskId, param.title)
        .then((res) => {
            /*
                        if (res.data.resultCode === 0) {
            */
            {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return {todolistId: param.todolistId, taskID: param.taskId, title: param.title}
            }
            /*} else {
                handleServerAppError(res, thunkAPI.dispatch)
            }*/

        })
    // .catch((error) => handleServerNetworkError(error, thunkAPI.dispatch))
})
export const updateTaskStatusTC = createAsyncThunk('tasks/updateTaskStatus', (param: { todolistId: string, taskId: string, status: any }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    return tasksAPI.updateTaskStatus(param.todolistId, param.taskId, param.status)
        .then((res) => {
            /* if (res.data.resultCode === 0) {
                 {*/
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {taskID: param.taskId, status: param.status, todolistId: param.todolistId}
            /*  }
          }*/
            /*else {
                /!*
                                    handleServerAppError(res, dispatch)
                *!/
            }*/

        })
    /*
                .catch((error) => handleServerNetworkError(error, dispatch))
    */
})


const initialState: any = {}
const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createTodolistTC.fulfilled, (state, action) => {
            state[action.payload.id] = []
        });
        builder.addCase(RemoveTodolistAC, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(fetchTodolistsThunk.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks

        });
        builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((x: any) => x.id === action.payload.taskID)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        });
        builder.addCase(createTasksTC.fulfilled, (state, action) => {
            let newTask: TaskType = {
                id: action.payload.taskId, title: action.payload.title, status: TaskStatus.Complited
                , completed: true, todoListId: "", description: "", deadline: "", startDate: ""
                , addedDate: "", order: 0, priority: TaskPriorities.Hi
            }
            state[action.payload.todolistId].unshift(newTask)
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const task = state[action.payload.todolistId]
            const index = task.findIndex((t: any) => t.id === action.payload.taskID)
            if (index > -1) {
                task[index].title = action.payload.title
            }
        });
        builder.addCase(updateTaskStatusTC.fulfilled, (state, action) => {
            const task = state[action.payload.todolistId]
            const index = task.findIndex((t: any) => t.id === action.payload.taskID)
            if (index > -1) {
                task[index].status = action.payload.status
            }
        });
    }
})


export const tasksReducer = slice.reducer







