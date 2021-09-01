import React, {useCallback, useEffect} from 'react';
import {v1} from 'uuid';
import '../../app/App.css';
import {TodoList} from "./Todolist/Todolist";
import {AddInputForm} from "../../components/add-item-form/AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    MenuItem,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {
    AddTodolistAC,
    CHANGETODOLISTFILTERAC,
    CHANGETODOLISTTITLEAC, createTodolistTC, deleteTodolistTC, fetchTodolistsThunk, FilterType,
    RemoveTodolistAC, setTodolistsAC,
    TodolistDomainType, updateTodolistTC,
} from "./todolistsReducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTasksTC, deleteTaskTC,
    fetchTasksTC,
    removeTaskAC, updateTaskTC
} from "./tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType, store} from "../../app/store";
import { todolistAPI} from "../../api/todolist-api";
import {ErrorSnackbar} from "../../components/error-snack-bar/ErrorSnackbar";
import {Redirect, Route} from 'react-router-dom';
import {Login} from "../auth/Login";
import {TaskStatus, TaskType} from "../../api/types";


export type tasksType = {
    [key: string]: TaskType[]
}

function TodolistList() {


    useEffect(()=>{
        if(!isLoggedIn){
            return;
        }
        dispatch(fetchTodolistsThunk())
    }, [])
    const dispatch = useDispatch()
    const todolists =useSelector<AppRootType, Array<TodolistDomainType>>(state => state.todolists)
    const tasksArray =useSelector<AppRootType, tasksType>(state => state.tasks)
    const isloaded= useSelector<AppRootType, boolean>((state)=>state.app.isLoaded)


/////////////////TODOLIST////////////////////////////
//удалить один тудуЛист. По факту мы меняем исхоные два осноных массива(тасок и ТЛ) и заново по ним реакт отрисовывает приложение
    let remuveTodoList =useCallback((todolistid: string) => {
        const action= deleteTodolistTC(todolistid)
        dispatch(action)
    },[])

    //add новый тудулист
    const addTodoList= useCallback((title: string) =>{
        const action= createTodolistTC(title)
        dispatch(action)
    }, [dispatch])

    // change title in tl
    const changeTitleTodolist=useCallback((title: string, todolistId: string) =>{
        const action= updateTodolistTC(todolistId, title)
        dispatch(action)
    },[])

    // меняет  значение фильтра
    const changefilters=useCallback((value: FilterType, TDid: string)=> {
        const action= CHANGETODOLISTFILTERAC({filter:value, id:TDid})
        dispatch(action)
    },[])


    ////////////////////TASKS///////////////////////////////

//delete choose task
    const deleteTask=useCallback((id: string, IdSelectedTL: string)=> {
        const action= deleteTaskTC(IdSelectedTL, id)
        dispatch(action)
    },[])

// add new task
    const addTask=useCallback((title: string, todolistId: string)=> {
        const action= createTasksTC(title, todolistId)
        dispatch(action)
    },[])

    // change title in task
    const changeTitleTask=useCallback((taskID: string, title: string, todolistId: string)=> {
        const action= updateTaskTC(todolistId, taskID, title)
        dispatch(action)
    },[])

// change isDone task
    const changeStatus=useCallback((taskID: string, status: TaskStatus, todolistId: string)=> {
        const action= changeTaskStatusAC({taskID:taskID, status:status, todolistId:todolistId})
        dispatch(action)
    },[])
    const isLoggedIn= useSelector<AppRootType, boolean>((state)=>state.login.isLoggedIn)
    const isInitialized= useSelector<AppRootType, boolean>((state)=>state.app.isInitialized)


    if(!isLoggedIn && isloaded){
        return <Redirect to={'/login'}/>
    }


    return (

        <div className="App">

            <Container fixed>

                <Grid container style={{padding: "30px"}}>
                    <AddInputForm addItem={addTodoList} />
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
                                        entityStatus={x.entityStatus}

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
export default TodolistList;