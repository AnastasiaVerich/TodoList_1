import React from 'react';
import {AddInputForm, inputFormType} from "./AddItemForm";
import {Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Example/AddItemForm',
    component: AddInputForm
}
const Template: Story<inputFormType> = (args) => <AddInputForm {...args} />;
const collback= action("accordion muven chenge event fired");
export const BaseExample = Template.bind({});
BaseExample.args = {
    addItem: collback
};
