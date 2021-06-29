import React, {useCallback, useEffect} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TodoList} from "./Todolist";
import {AddInputForm} from "./AddItemForm";
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
} from "./state/todolistsReducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTasksTC, deleteTaskTC,
    fetchTasksTC,
    removeTaskAC, updateTaskTC
} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType, store} from "./state/store";
import {TaskStatus, TaskType, todolistAPI} from "./api/todolist-api";


export type tasksType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {
    let status = store.getState().app.status

    // useEffect(()=>{
    //     todolistAPI.getTodoLists()
    //         .then ((res)=>{
    //             let todos = res.data
    //             dispatch(setTodolistsAC(todos))
    //         })
    // },[])
    useEffect(()=>{
        dispatch(fetchTodolistsThunk())
    }, [])



    // генерируем айдишки
    let TDid1 = v1()
    let TDid2 = v1()
    let TDid3 = v1()

    const dispatch = useDispatch()
    const todolists =useSelector<AppRootType, Array<TodolistDomainType>>(state => state.todolists)
    const tasksArray =useSelector<AppRootType, tasksType>(state => state.tasks)

/////////////////TODOLIST////////////////////////////
//удалить один тудуЛист. По факту мы меняем исхоные два осноных массива(тасок и ТЛ) и заново по ним реакт отрисовывает приложение
    let remuveTodoList =useCallback((todolistid: string) => {
        const action= deleteTodolistTC(todolistid)
        dispatch(action)
    },[dispatch])

    //add новый тудулист
    const addTodoList= useCallback((title: string) =>{
        const action= createTodolistTC(title)
        dispatch(action)
    }, [dispatch])

    // change title in tl
    const changeTitleTodolist=useCallback((title: string, todolistId: string) =>{
        const action= updateTodolistTC(todolistId, title)
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
        const action= deleteTaskTC(IdSelectedTL, id)
        dispatch(action)
    },[dispatch])

// add new task
    const addTask=useCallback((title: string, todolistId: string)=> {
        const action= createTasksTC(title, todolistId)
        dispatch(action)
    },[dispatch])

    // change title in task
    const changeTitleTask=useCallback((taskID: string, title: string, todolistId: string)=> {
        const action= updateTaskTC(todolistId, taskID, title)
        dispatch(action)
    },[dispatch])

// change isDone task
    const changeStatus=useCallback((taskID: string, status: TaskStatus, todolistId: string)=> {
       debugger
        const action= changeTaskStatusAC(taskID, status, todolistId)
        dispatch(action)
    },[dispatch])




    return (

        <div className="App">
            { console.log("render all")}
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
                { status === 'loading' && <LinearProgress />}
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
export default AppWithRedux;