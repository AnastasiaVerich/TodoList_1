import {tasksType} from "../App";
import {AddTodolistAC, TodolistDomainType, todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";
import {TodolistType} from "../api/todolist-api";


/*test('ids should be equals', () => {
    const startTasksState: tasksType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = AddTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});*/
