import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TaskPriorities, TaskStatus, TaskType, UpdateTaskModelType} from "../../api/types";
import {tasksAPI} from "../../api/todolist-api";
import {appCommonActions} from "../common-actions/App";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {AppRootType, ThunkError} from "../../utils/types";
import {asyncActions as asyncTodolistsActions} from './todolistsReducer'


const initialState: any = {}
const {setAppStatus} = appCommonActions


 const fetchTasksTC = createAsyncThunk<{ tasks: TaskType[], todolistId: string }, string, ThunkError>('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
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
 const createTasksTC = createAsyncThunk<TaskType, { title: string, todolistId: string }, ThunkError>('tasks/createTasks', async (param: { title: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        let res = await tasksAPI.createTasks(param.title, param.todolistId)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(appCommonActions.setAppStatus({status: 'succeeded'}))
            return res.data.data.item
        } else {
            handleAsyncServerAppError(res.data, thunkAPI, false)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err) {
        return handleAsyncServerNetworkError(err, thunkAPI, false)
    }
})
 const deleteTaskTC = createAsyncThunk<{ taskId: string, todolistId: string }, { taskId: string, todolistId: string }, ThunkError>('tasks/deleteTask', async (param, thunkAPI) => {

    try {
        const res = await tasksAPI.deleteTask(param.todolistId, param.taskId)
        if (res.data.resultCode === 0) {
            return {todolistId: param.todolistId, taskID: param.taskId}

        } else {
            handleAsyncServerAppError(res.data, thunkAPI, false)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err) {
        return handleAsyncServerNetworkError(err, thunkAPI, false)
    }


})
 const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string }, thunkAPI) => {

    const state = thunkAPI.getState() as AppRootType

    const task = state.tasks[param.todolistId].find((t:TaskType) => t.id === param.taskId)
    if (!task) {
        return thunkAPI.rejectWithValue('task not found in the state')
    }

    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.model
    }
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await tasksAPI.updateTask(param.todolistId, param.taskId, apiModel)
    try {
        if (res.data.resultCode === 0) {
            return param
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})


export const asyncActions = {
    fetchTasksTC,
    createTasksTC,
    deleteTaskTC,
    updateTaskTC
}
export const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncTodolistsActions.createTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(asyncTodolistsActions.deleteTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(asyncTodolistsActions.fetchTodolistsThunk.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks

        });
        builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
            console.log(state)

            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((x: any) => x.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)

            }
        });
        builder.addCase(createTasksTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)

        });
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((t:TaskType) => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        });
    }
})



export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatus
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}





