import React, {useReducer, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TodoList} from "./Todolist";
import {AddInputForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, MenuItem, Paper, Toolbar, Typography} from "@material-ui/core";
import {
    AddTodolistAC,
    CHANGETODOLISTFILTERAC,
    CHANGETODOLISTTITLEAC,
    FilterType,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasksReducer";
import {TaskPriorities, TaskStatus, TaskType} from "./api/todolist-api";

export type tasksType = {
    [key: string]: TaskType[]
}

function AppWithReducer() {
    // генерируем айдишки
    let TDid1 = v1()
    let TDid2 = v1()
    let TDid3 = v1()
    //массив с айдишниками тудуЛистов, их названиями и активными фильтрами(по умолчанию желательно фильтр all)
    let [todolists, dispatcToTodoLists] = useReducer(todolistsReducer,[
        {id: TDid1, title: "What to learn", filter: "active", addedDate: "",
            order: 0},
        {id: TDid2, title: "Second Tasks", filter: "complited", addedDate: "",
            order: 0},
        {id: TDid3, title: "3 Tasks", filter: "all", addedDate: "",
            order: 0}
    ])
    // массив задач для тудулистов
    let [tasksArray, dispatcToTasks] = useReducer( tasksReducer,{
        [TDid1]: [
            {id: v1(), title: "HTML", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            {id: v1(), title: "JS", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            {id: v1(), title: "React", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            {id: v1(), title: "Rdux", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" }],
        [TDid2]: [
            {id: v1(), title: "BOOK", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            {id: v1(), title: "MILK", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" }],
        [TDid3]: [
            {id: v1(), title: "Ruslan", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            {id: v1(), title: "Anastasia", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            {id: v1(), title: "Main", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" }]
    })
    let [filter, setFilter] = useState<FilterType>("all")

/////////////////TODOLIST////////////////////////////
//удалить один тудуЛист. По факту мы меняем исхоные два осноных массива(тасок и ТЛ) и заново по ним реакт отрисовывает приложение
    let remuveTodoList = (todolistid: string) => {
        const action= RemoveTodolistAC(todolistid)
        dispatcToTodoLists(action)
        dispatcToTasks(action)
    }

    //add новый тудулист
    function addTodoList(title: string) {
        const action= AddTodolistAC(title)
        dispatcToTodoLists(action)
        dispatcToTasks(action)
    }

    // change title in tl
    function changeTitleTodolist(title: string, todolistId: string) {
        const action= CHANGETODOLISTTITLEAC(title, todolistId)
        dispatcToTodoLists(action)
    }

    // меняет  значение фильтра
    function changefilters(value: FilterType, TDid: string) {
        const action= CHANGETODOLISTFILTERAC(value, TDid)
        dispatcToTodoLists(action)
    }


 ////////////////////TASKS///////////////////////////////

//delete choose task
    function deleteTask(id: string, IdSelectedTL: string) {
        const action= removeTaskAC(id, IdSelectedTL)
        dispatcToTasks(action)
    }

// add new task
    function addTask(title: string, todolistId: string) {
        const action= addTaskAC(title, todolistId)
        dispatcToTasks(action)
    }

    // change title in task
    function changeTitleTask(taskID: string, title: string, todolistId: string) {
        const action= changeTaskTitleAC(taskID, title, todolistId)
        dispatcToTasks(action)
    }

// change isDone task
    function changeStatus(taskID: string, status: TaskStatus, todolistId: string) {
        const action= changeTaskStatusAC(taskID, status, todolistId)
        dispatcToTasks(action)
    }




    return (

        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuItem/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "30px"}}>
                    <AddInputForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map
                    ((x) => {
                        //помещаем в переменную все задачи для тудулиста(по одинаковым айди)
                        let arrayTasksForONEtodolist = tasksArray[x.id];
                        if (x.filter === "complited") {
                            arrayTasksForONEtodolist = arrayTasksForONEtodolist.filter(t => t.status === TaskStatus.Complited)
                        }
                        if (x.filter === "active") {
                            arrayTasksForONEtodolist = arrayTasksForONEtodolist.filter(t => t.status === TaskStatus.New)
                        }

                        return<Grid item>
                            <Paper style={{padding: "10px"}}>
                        <TodoList
                            key={x.id}
                            id={x.id}
                            remuveTodoList={remuveTodoList}
                            title={x.title}
                            tasks={arrayTasksForONEtodolist}
                            remuve={deleteTask}
                            filt={changefilters}
                            add={addTask}
                            changeStatus={changeStatus}
                            filter={x.filter}
                            changeTitleTask={changeTitleTask}
                            changeTitleTodolist={changeTitleTodolist}

                        />
                            </Paper>
                        </Grid>
                    })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;
