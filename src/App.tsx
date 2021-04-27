import React, {useState} from 'react';
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

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type FilterType = "all" | "complited" | "active"
type tasksType = {
    [key: string]: TaskType[]
}

function App() {
    // генерируем айдишки
    let TDid1 = v1()
    let TDid2 = v1()
    let TDid3 = v1()
    //массив с айдишниками тудуЛистов, их названиями и активными фильтрами(по умолчанию желательно фильтр all)
    let [todolists, SetTodoLists] = useState<Array<TodolistType>>([
        {id: TDid1, title: "What to learn", filter: "active"},
        {id: TDid2, title: "Second Tasks", filter: "complited"},
        {id: TDid3, title: "3 Tasks", filter: "all"}
    ])
    // массив задач для тудулистов
    let [tasksArray, setTasks] = useState<tasksType>({
        [TDid1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Rdux", isDone: true}],
        [TDid2]: [
            {id: v1(), title: "BOOK", isDone: true},
            {id: v1(), title: "MILK", isDone: true}],
        [TDid3]: [
            {id: v1(), title: "Ruslan", isDone: true},
            {id: v1(), title: "Anastasia", isDone: true},
            {id: v1(), title: "Main", isDone: false}]
    })


//удалить один тудуЛист. По факту мы меняем исхоные два осноных массива(тасок и ТЛ) и заново по ним реакт отрисовывает приложение
    let remuveTodoList = (todolistid: string) => {
        debugger
        //фильтруем массив тудуЛистов. В отфильтрованный массив попадают не выбранные таски
        let filter = todolists.filter(x => x.id !== todolistid);
        SetTodoLists(filter);
        delete tasksArray[todolistid];//удаляем в обьекте тасок такску под выбранным айди
        setTasks({...tasksArray})
    }


//delete choose task
    function deleteTask(id: string, IdSelectedTL: string) {
        let tasks = tasksArray[IdSelectedTL]

        let filterTask = tasks.filter((t) => t.id !== id)
        tasksArray[IdSelectedTL] = filterTask
        setTasks({...tasksArray})
    }

// add new task
    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: true}
        let tasks = tasksArray[todolistId]
        let newTasks = [newTask, ...tasks];
        tasksArray[todolistId] = newTasks
        setTasks({...tasksArray})
    }

// change isDone task
    function changeStatus(taskID: string, isDone: boolean, todolistId: string) {
        let tasks = tasksArray[todolistId]
        let task = tasks.find(t => t.id === taskID);
        if (task) {
            task.isDone = isDone
            setTasks({...tasksArray})
        }
    }

    let [filter, setFilter] = useState<FilterType>("all")

// меняет  значение фильтра
    function changefilters(value: FilterType, TDid: string) {
        let toDo = todolists.find(x => x.id === TDid);
        if (toDo) {
            toDo.filter = value
            SetTodoLists([...todolists])
        }
    }

//add новый тудулист
    function addTodoList(title: string) {
        let newTodoList: TodolistType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        SetTodoLists([...todolists, newTodoList])
        setTasks({...tasksArray, [newTodoList.id]: []})
    }

    // change title in task
    function changeTitleTask(taskID: string, title: string, todolistId: string) {
        //достаем нужный массив тасок по айди тудлиста
        let tasks = tasksArray[todolistId]
        //находим в этом массиве нужную таску
        let task = tasks.find(t => t.id === taskID);
        // если таска существует, меняем ее
        if (task) {
            task.title = title
            // создаем и сетамем копию обьекта, что бы реакт отрисовал
            setTasks({...tasksArray})
        }
    }


    // change title in task
    function changeTitleTodolist(title: string, todolistId: string) {
        //достаем нужный массив тасок по айди тудлиста
        //находим в этом массиве нужную таску
        let td = todolists.find(t => t.id === todolistId);
        // если таска существует, меняем ее
        if (td) {
            td.title = title
            // создаем и сетамем копию обьекта, что бы реакт отрисовал
            SetTodoLists([...todolists])
        }
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

export default App;
