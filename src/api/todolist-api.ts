import axios from 'axios'
import {
    GetTasksResponse,
    LoginParamsType,
    ResponseType,
    TaskStatus,
    TaskType,
    TodolistType,
    UpdateTaskModelType
} from "./types";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '603ef8c0-4933-4294-ab5f-b170d3ebe6d8'
    }
})


export const todolistAPI = {
    getTodoLists() {
        return instance.get<TodolistType[]>('todo-lists')

    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists',
            {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`,
            {title: title})
    },


}

export const tasksAPI = {
    getTasks(todolistId: string) {
        const promise = instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
    createTasks(title: string, todolistId: string) {
        const promise = instance.post<ResponseType<{ item: TaskType}>>(`todo-lists/${todolistId}/tasks`,
            {title: title})
        return promise
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }

}

export const authAPI = {
    login(data: LoginParamsType) {
        const promise = instance.post<ResponseType<{userId?: number}>>('auth/login', data);
        return promise;
    },
    logout(){
        return instance.delete<ResponseType<{userId?: number}>>('auth/login')
    },
    me(){
        return instance.get<ResponseType<{ id: number; email: string; login: string }>>('auth/me')
    }
}