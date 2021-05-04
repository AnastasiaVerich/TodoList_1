import React, {useReducer, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, TodoList} from "./Todolist";
import {AddInputForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {
    AddTodolistAC,
    CHANGETODOLISTFILTERAC,
    CHANGETODOLISTTITLEAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./state/store";

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type FilterType = "all" | "complited" | "active"
export type tasksType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {
    // генерируем айдишки
    let TDid1 = v1()
    let TDid2 = v1()
    let TDid3 = v1()

    const dispatch = useDispatch()
    const todolists =useSelector<AppRootType, Array<TodolistType>>(state => state.todolists)
    const tasksArray =useSelector<AppRootType, tasksType>(state => state.tasks)

/////////////////TODOLIST////////////////////////////
//удалить один тудуЛист. По факту мы меняем исхоные два осноных массива(тасок и ТЛ) и заново по ним реакт отрисовывает приложение
    let remuveTodoList = (todolistid: string) => {
        const action= RemoveTodolistAC(todolistid)
        dispatch(action)
    }

    //add новый тудулист
    function addTodoList(title: string) {
        const action= AddTodolistAC(title)
        dispatch(action)
    }

    // change title in tl
    function changeTitleTodolist(title: string, todolistId: string) {
        const action= CHANGETODOLISTTITLEAC(title, todolistId)
        dispatch(action)
    }

    // меняет  значение фильтра
    function changefilters(value: FilterType, TDid: string) {
        const action= CHANGETODOLISTFILTERAC(value, TDid)
        dispatch(action)
    }


 ////////////////////TASKS///////////////////////////////

//delete choose task
    function deleteTask(id: string, IdSelectedTL: string) {
        const action= removeTaskAC(id, IdSelectedTL)
        dispatch(action)
    }

// add new task
    function addTask(title: string, todolistId: string) {
        const action= addTaskAC(title, todolistId)
        dispatch(action)
    }

    // change title in task
    function changeTitleTask(taskID: string, title: string, todolistId: string) {
        const action= changeTaskTitleAC(taskID, title, todolistId)
        dispatch(action)
    }

// change isDone task
    function changeStatus(taskID: string, isDone: boolean, todolistId: string) {
        const action= changeTaskStatusAC(taskID, isDone, todolistId)
        dispatch(action)
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
                            arrayTasksForONEtodolist = arrayTasksForONEtodolist.filter(t => t.isDone === true)
                        }
                        if (x.filter === "active") {
                            arrayTasksForONEtodolist = arrayTasksForONEtodolist.filter(t => t.isDone === false)
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

export default AppWithRedux;
