import React, {useCallback} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, TodoList} from "./Todolist";
import {AddInputForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, MenuItem, Paper, Toolbar, Typography} from "@material-ui/core";
import {AddTodolistAC, CHANGETODOLISTFILTERAC, CHANGETODOLISTTITLEAC, RemoveTodolistAC,} from "./state/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
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
    console.log('app render')
    // генерируем айдишки
    let TDid1 = v1()
    let TDid2 = v1()
    let TDid3 = v1()

    const dispatch = useDispatch()
    const todolists =useSelector<AppRootType, Array<TodolistType>>(state => state.todolists)
    const tasksArray =useSelector<AppRootType, tasksType>(state => state.tasks)

/////////////////TODOLIST////////////////////////////
//удалить один тудуЛист. По факту мы меняем исхоные два осноных массива(тасок и ТЛ) и заново по ним реакт отрисовывает приложение
    let remuveTodoList =useCallback((todolistid: string) => {
        const action= RemoveTodolistAC(todolistid)
        dispatch(action)
    },[dispatch])

    //add новый тудулист
    const addTodoList= useCallback((title: string) =>{
        const action= AddTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    // change title in tl
    const changeTitleTodolist=useCallback((title: string, todolistId: string) =>{
        const action= CHANGETODOLISTTITLEAC(title, todolistId)
        dispatch(action)
    },[dispatch])

    // меняет  значение фильтра
    const changefilters=useCallback((value: FilterType, TDid: string)=> {
        const action= CHANGETODOLISTFILTERAC(value, TDid)
        dispatch(action)
    },[dispatch])


 ////////////////////TASKS///////////////////////////////

//delete choose task
    const deleteTask=useCallback((id: string, IdSelectedTL: string)=> {
        const action= removeTaskAC(id, IdSelectedTL)
        dispatch(action)
    },[dispatch])

// add new task
    const addTask=useCallback((title: string, todolistId: string)=> {
        const action= addTaskAC(title, todolistId)
        dispatch(action)
    },[dispatch])

    // change title in task
    const changeTitleTask=useCallback((taskID: string, title: string, todolistId: string)=> {
        const action= changeTaskTitleAC(taskID, title, todolistId)
        dispatch(action)
    },[dispatch])

// change isDone task
    const changeStatus=useCallback((taskID: string, isDone: boolean, todolistId: string)=> {
        const action= changeTaskStatusAC(taskID, isDone, todolistId)
        dispatch(action)
    },[dispatch])




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