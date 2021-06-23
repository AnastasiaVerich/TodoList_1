import React from 'react';
import {AddInputForm, inputFormType} from "./AddItemForm";
import {Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task, TASKStype} from "./Task";
import {TaskType} from "./Todolist";

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
    x: {id: "1", title: "CSS", isDone: true},
    id: "10"
};
