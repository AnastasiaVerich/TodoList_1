import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, TodoList} from "./Todolist";

type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type FilterType = "all" | "complited" | "active"

function App() {

//delete choose task
    function deleteTask(id: string, todolistId: string) {
        let tasks= TaskObj[todolistId]

        let filterTask = tasks.filter((t) => t.id !== id)
        TaskObj[todolistId]=filterTask
        setTask({...TaskObj})
    }

// add new task
    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: true}
        let tasks= TaskObj[todolistId]
        let newTasks = [newTask, ...tasks];
        TaskObj[todolistId] = newTasks
        setTask({...TaskObj})
    }

// change isDone task
    function changeStatus(taskID: string, isDone: boolean, todolistId: string) {
        let tasks= TaskObj[todolistId]
        let task = tasks.find(t => t.id === taskID);
        if (task) {
            task.isDone = isDone
            setTask({...TaskObj})
        }
    }

    let [filter, setFilter] = useState<FilterType>("all")

// меняет  значение фильтра
    function changefilters(value: FilterType, TDid: string) {
        let toDo = todolist.find(x => x.id === TDid);
        if (toDo) {
            toDo.filter = value
            setTodolist([...todolist])
        }

    }

    let TDid1=v1()
    let TDid2=v1()

    let [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: TDid1, title: "What to learn", filter: "active"},
        {id: TDid2, title: "Second Tasks", filter: "complited"},
    ])

    let remuveTodoList =(todolistid: string)=>{
        let filteTodoList= todolist.filter(x=> x.id !== todolistid);
        setTodolist(filteTodoList);
        delete TaskObj[todolistid];
        setTask({...TaskObj})
    }

    let [TaskObj, setTask] = useState({
        [TDid1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Rdux", isDone: true}],
        [TDid2]: [
            {id: v1(), title: "BOOK", isDone: true},
            {id: v1(), title: "MILK", isDone: true}]
    })



    return (

        <div className="App">
            {
                todolist.map(
                    (x) => {

                        let TasksForTodolist = TaskObj[x.id];
                        if (x.filter === "complited") {
                            TasksForTodolist = TasksForTodolist.filter(t => t.isDone===true)
                        }
                        if (x.filter === "active") {
                            TasksForTodolist = TasksForTodolist.filter(t => t.isDone===false)
                        }

                        return <TodoList
                            key={x.id}
                            id={x.id}
                            title={x.title}
                            tasks={TasksForTodolist}
                            remuve={deleteTask}
                            filt={changefilters}
                            add={addTask}
                            changeStatus={changeStatus}
                            filter={x.filter}
                            remuveTodoList={remuveTodoList}
                        />
                    }
                )
            }
        </div>
    );
}

export default App;
