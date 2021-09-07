import React, {useCallback, useEffect} from "react";
import '../../../app/App.css';
import {AddInputForm, AddItemFormSubmitHelperType} from "../../../components/add-item-form/AddItemForm";
import {EditSpan} from "../../../components/editable-span/EditSpan";
import {Button, IconButton, PropTypes} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./task/Task";
import {FilterType, TodolistDomainType} from "../todolistsReducer";
import {TaskStatus, TaskType} from "../../../api/types";
import {useActions, useAppDispatch} from "../../../utils/redux-utils";
import {tasksActions, todolistsActions} from "../index";


type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
}

export const TodoList = React.memo(function (props: PropsType) {
    const dispatch = useAppDispatch()
    const {fetchTasksTC, createTasksTC} = useActions(tasksActions)
    const {
        CHANGETODOLISTFILTERAC,
        updateTodolistTC,
        deleteTodolistTC
    } = useActions(todolistsActions)

    useEffect(() => {
        fetchTasksTC(props.todolist.id)
    }, [])

    const addTask = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
        //const result = await createTasksTC({title: title, todolistId: props.todolist.id})

        let thunk = tasksActions.createTasksTC({title: title, todolistId: props.todolist.id})
        const result = await dispatch(thunk)
        if (tasksActions.createTasksTC.rejected.match(result)) {
            if (result.payload?.errors?.length) {
                const errorMessage = result.payload?.errors[0]
                helper.setError(errorMessage)
                console.log(errorMessage)

            } else {
                helper.setError('Some error occured')
            }
        } else {
            helper.setTitle('')
        }
    }, [props.todolist.id])

    const remuveTodolist = () => {
        deleteTodolistTC(props.todolist.id)
    }

    const onchangeTitleTodolist = useCallback((title: string) => {
        updateTodolistTC({id: props.todolist.id, title: title})
    }, [props.todolist.id])


    const onFilterButtonClickHandler = useCallback((filter: FilterType) =>
        CHANGETODOLISTFILTERAC({
            filter: filter,
            id: props.todolist.id
        }), [props.todolist.id])

    let arrayTasksForONEtodolist = props.tasks
    if (props.todolist.filter === "active") {
        arrayTasksForONEtodolist = props.tasks.filter(t => t.status === TaskStatus.New)
    }
    if (props.todolist.filter === "complited") {
        arrayTasksForONEtodolist = props.tasks.filter(t => t.status === TaskStatus.Complited)
    }
    const renderFilterButton = (buttonFilter: FilterType,
                                color: PropTypes.Color,
                                text: string) => {
        return <Button variant={props.todolist.filter === buttonFilter ? 'outlined' : 'text'}
                       onClick={() => onFilterButtonClickHandler(buttonFilter)}
                       color={color}>{text}
        </Button>
    }


    return <div>
        <h3>
            <EditSpan onChange={onchangeTitleTodolist} value={props.todolist.title} />
            <IconButton onClick={remuveTodolist} disabled={props.todolist.entityStatus === "loading"}><Delete/></IconButton>
        </h3>
        <AddInputForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"}/>
        <div>
           {
               arrayTasksForONEtodolist.map(x => <Task
                                                     task={x}
                                                     todolistID={props.todolist.id}
                                                     key={x.id}/>)
            }
        </div>
        <div>
            {renderFilterButton('all', 'default', 'All')}
            {renderFilterButton('active', 'primary', 'Active')}
            {renderFilterButton('complited', 'secondary', 'Completed')}

        </div>
    </div>
})


