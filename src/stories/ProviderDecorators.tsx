import React from "react";
import {Provider} from "react-redux";
import {AppRootType, store} from "../state/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasksReducer";
import {todolistsReducer} from "../state/todolistsReducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatus} from "../api/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: "",
            order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: "",
            order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            {id: v1(), title: "JS", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" }
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk",status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            {id: v1(), title: "React Book", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" }
        ]
    }
};
export const storyBookStore = createStore(rootReducer, initialGlobalState );

export const ProviderDecorators=(story: any)=>{
    return <Provider store={storyBookStore}>{story()}</Provider>
}