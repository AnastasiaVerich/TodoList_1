import React, {useCallback, useEffect} from 'react';
import '../../app/App.css';
import {TodoList} from "./Todolist/Todolist";
import {AddInputForm, AddItemFormSubmitHelperType} from "../../components/add-item-form/AddItemForm";
import {Container, Grid, Paper} from "@material-ui/core";
import {TodolistDomainType,} from "./todolistsReducer";
import {useSelector} from "react-redux";
import {AppRootType} from "../../app/store";
import {Redirect} from 'react-router-dom';
import {TaskType} from "../../api/types";
import {TasksStateType} from "./tasksReducer";
import {selectIsLoggedIn} from "../auth/selectors";
import {useActions, useAppDispatch} from "../../utils/redux-utils";
import {todolistsActions} from "./index";
import {selectIsInitialized} from "../application/selectors";


export type tasksType = {
    [key: string]: TaskType[]
}

const TodolistList = () => {
    const todolists = useSelector<AppRootType, Array<TodolistDomainType>>(state => state.todolists)
    const tasksArray = useSelector<AppRootType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const isInitialized = useSelector(selectIsInitialized)

    const dispatch = useAppDispatch()

    const {fetchTodolistsThunk} = useActions(todolistsActions)
    //add новый тудулист
    const addTodoList = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
        let thunk = todolistsActions.createTodolistTC(title)
        const result = await dispatch(thunk)
        if (todolistsActions.createTodolistTC.rejected.match(result)) {
            if (result.payload?.errors?.length) {
                const errorMessage = result.payload?.errors[0]
                helper.setError(errorMessage)
            } else {
                helper.setError('Some error occured')
            }
        } else {
            helper.setTitle('')
        }
    }, [])

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        fetchTodolistsThunk()
    }, [])
    /*
    /////////////////TODOLIST////////////////////////////
    //удалить один тудуЛист. По факту мы меняем исхоные два осноных массива(тасок и ТЛ) и заново по ним реакт отрисовывает приложение
        let remuveTodoList = useCallback((todolistid: string) => {
            const action = deleteTodolistTC(todolistid)
            dispatch(action)
        }, [])


        // change value in tl
        const changeTitleTodolist = useCallback((title: string, todolistId: string) => {
            const action = updateTodolistTC({todolistID: todolistId, title: title})
            dispatch(action)
        }, [])

        // меняет  значение фильтра
        const changefilters = useCallback((value: FilterType, TDid: string) => {
            const action = CHANGETODOLISTFILTERAC({filter: value, todolistID: TDid})
            dispatch(action)
        }, [])


        ////////////////////TASKS///////////////////////////////

    //delete choose task
        const deleteTask = useCallback((taskID: string, todolistId: string) => {
            const action = deleteTaskTC({todolistId, taskID})
            dispatch(action)
        }, [])

    // add new task
        const addTask = useCallback((title: string, todolistId: string) => {
            const action = createTasksTC({title, todolistId})
            dispatch(action)
        }, [])

        // change value in task
        const changeTitleTask = useCallback((taskID: string, title: string, todolistId: string) => {
            const action = updateTaskTC({todolistId: todolistId, taskId: taskID, title: title})
            dispatch(action)
        }, [])
        // change status in task
        const changeStatus = useCallback((taskID: string, status: any, todolistId: string) => {
            const action = updateTaskStatusTC({todolistId: todolistId, taskId: taskID, status: status})
            dispatch(action)
        }, [])

    // change isDone task
    //     const changeStatus=useCallback((taskID: string, status: TaskStatus, todolistId: string)=> {
    //         const action= changeTaskStatusAC({taskID:taskID, status:status, todolistId:todolistId})
    //         dispatch(action)
    //     },[])

    */
    if (!isLoggedIn ) {
        return <Redirect to={'/auth'}/>
    }


    return (

        <div className="App">
            <Container fixed>
                <Grid container style={{padding: "30px"}}>
                    <AddInputForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map
                    ((x) => {
                        //помещаем в переменную все задачи для тудулиста(по одинаковым айди)
                        let allTodolistTasks = tasksArray[x.id];
                        /* if (task.filter === "complited") {
                             arrayTasksForONEtodolist = arrayTasksForONEtodolist.filter(t => t.status === TaskStatus.Complited)
                         }
                         if (task.filter === "active") {
                             arrayTasksForONEtodolist = arrayTasksForONEtodolist.filter(t => t.status === TaskStatus.New)
                         }*/

                        return <Grid item>
                            <Paper style={{padding: "10px"}}>

                                <TodoList
                                    key={x.id}
                                    tasks={allTodolistTasks}
                                    todolist={x}
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