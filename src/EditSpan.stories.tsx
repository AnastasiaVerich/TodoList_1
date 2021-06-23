import React from 'react';
import {Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task, TASKStype} from "./Task";
import {EditSpan, EditSpanProps} from "./EditSpan";

export default {
    title: 'Example/EditSpan',
    component: EditSpan
}
const Template: Story<EditSpanProps> = (args) => <EditSpan {...args} />;
const collback = action("accordion muven chenge event fired");
export const BaseExample = Template.bind({});
BaseExample.args = {
    title: "111",
    onChangeTitle:()=>{}
};
