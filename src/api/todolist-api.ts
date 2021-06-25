import axios from 'axios'

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}
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
        const promise = instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`,
            {title: title})
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
        return promise
    },
    createTodolist(title: string){
        const promise = instance.post<ResponseType<{ item: TodolistType }>>('todo-lists',
            {title: title})
        return promise
    },
    getTodoLists (){
        const promise = instance.get<Array<TodolistType>>('todo-lists')
        return promise

    }
}

export const tasksAPI ={
    getTasks(todolistId: string){
        const promise = instance.get(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTasks(title: string, todolistId: string){
        const promise = instance.post(`todo-lists/${todolistId}/tasks`,
            {title: title})
        return promise
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        const promise = instance.put(`todo-lists/${todolistId}/tasks/${taskId}`,
            {title: title})
        return promise
    },
    deleteTask(todolistId: string, taskId: string ) {
        const promise = instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
}