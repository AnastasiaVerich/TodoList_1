import React from 'react';
import {Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task, TASKStype} from "./Task";
import {TaskPriorities, TaskStatus} from "./api/todolist-api";

export default {
    title: 'Example/Task',
    component: Task
}
const Template: Story<TASKStype> = (args) => <Task {...args} />;
const collback = action("accordion muven chenge event fired");
export const BaseExample = Template.bind({});
BaseExample.args = {
    remuve: () => {
    },
    changeStatus: () => {
    },
    changeTitleTask: () => {
    },
    x: {id: "1", title: "CSS", status: TaskStatus.Complited, addedDate:"", order:0
        , priority: TaskPriorities.Hi, completed: true, todoListId:""
        , description:"", deadline:"", startDate:"" },
    id: "10"
};
