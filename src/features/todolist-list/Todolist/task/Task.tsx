import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditSpan} from "../../../../components/editable-span/EditSpan";
import {TaskStatus, TaskType} from "../../../../api/types";
import {useActions} from "../../../../utils/redux-utils";
import {tasksActions} from "../../index";
import {Delete} from "@material-ui/icons";

export type TASKStype = {

    task: TaskType//task
    todolistID: string//todolistID

}
export const Task = React.memo((props: TASKStype) => {
    const {deleteTaskTC, updateTaskTC} = useActions(tasksActions)

    const onClikHeader = useCallback(() => deleteTaskTC({taskId: props.task.id, todolistId: props.todolistID}),
        [props.task.id, props.todolistID])

    const onStatusChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTaskTC({
                taskId: props.task.id,
                model: {status: e.currentTarget.checked ? TaskStatus.Complited : TaskStatus.New},
                todolistId: props.todolistID
            }
        )
    }, [props.task.id, props.todolistID])

    const onChangeTitle = useCallback((title: string) => {
        updateTaskTC({
                taskId: props.task.id,
                model: {title:title},
                todolistId: props.todolistID
            }
        )    }, [props.task.id, props.todolistID])


    return (
        <div key={props.task.id} className={props.task.status === TaskStatus.Complited ? "is-done" : ""}>
            <Checkbox
                checked={props.task.status == TaskStatus.Complited}
                color={"primary"}
                onChange={onStatusChange}/>
            <EditSpan value={props.task.title}
                      onChange={onChangeTitle}/>
            <IconButton onClick={onClikHeader}>
                <Delete fontSize={'small'}/>
            </IconButton>

        </div>)
})