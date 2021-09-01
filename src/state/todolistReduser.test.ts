
import {v1} from 'uuid';
import {
    AddTodolistAC,
    CHANGETODOLISTFILTERAC,
    CHANGETODOLISTTITLEAC, FilterType,
    RemoveTodolistAC, TodolistDomainType,
    todolistsReducer
} from "../features/todolist-list/todolistsReducer";
import {TodolistType} from "../api/todolist-api";

test('correct todolist should be removed', () => {


    let todolistId1 = v1();
    let todolistId2 = v1();
    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "",
            order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "",
            order: 0, entityStatus: 'idle'}
    ]

    const endState = todolistsReducer(startState, RemoveTodolistAC({id:todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistTitle = "New Todolist";
    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "",
            order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "",
            order: 0, entityStatus: 'idle'}
    ]


    const endState = todolistsReducer(startState, AddTodolistAC({title:newTodolistTitle, id:""}))


    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistTitle = "New Todolist";
    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "",
            order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "",
            order: 0, entityStatus: 'idle'}
    ]
    const action = CHANGETODOLISTTITLEAC({title:newTodolistTitle, id:todolistId2})

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newFilter: FilterType = "complited";
    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "",
            order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "",
            order: 0, entityStatus: 'idle'}
    ]
    const action= CHANGETODOLISTFILTERAC({filter:newFilter, id: todolistId2})

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});