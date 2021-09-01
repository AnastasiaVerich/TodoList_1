import axios from 'axios'
import {GetTasksResponse, ResponseType, TaskStatus, TaskType, TodolistType, UpdateTaskModelType} from "./types";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '603ef8c0-4933-4294-ab5f-b170d3ebe6d8'
    }
})


export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`,
            {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists',
            {title: title})
    },
    getTodoLists() {
        return instance.get<TodolistType[]>('todo-lists')

    }
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        const promise = instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTasks(title: string, todolistId: string) {
        const promise = instance.post<ResponseType<{ item: TaskType}>>(`todo-lists/${todolistId}/tasks`,
            {title: title})
        return promise
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        const promise = instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`,
            {title: title})
        return promise
    },
    updateTaskStatus(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        const promise = instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`,
            {          /*  "deadline": null,
                "description": null,
                "priority": 1,
                "startDate": null,*/
                "title": "wd",
                "status": 0
        })
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
}

export const authAPI = {
    login(email: string, password: string, rememberMe: boolean, captcha: any) {
        const promise = instance.post<ResponseType<{userId?: number}>>(`auth/login`,
            {email, password, rememberMe, captcha  }
        )
        return promise
    },
    me(){
        return instance.get<ResponseType<{ id: number; email: string; login: string }>>('auth/me')
    },
    logout(){
        return instance.delete<ResponseType<{userId?: number}>>('auth/login')
    }
}