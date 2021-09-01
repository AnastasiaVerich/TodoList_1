export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
 export type FieldErrorType = { field: string; error: string }
export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<FieldErrorType>

    data: D
}

 export enum TaskStatus {
    New,
    InProgress,
    Complited,
    Draft

}

 export enum TaskPriorities {
    Low = 0,
    Middle,
    Hi,
    Urgently,
    Later
}



export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatus
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriorities
    startDate: string
    deadline: string
}