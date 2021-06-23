import React from 'react';
import {Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task, TASKStype} from "./Task";
import {EditSpan, EditSpanProps} from "./EditSpan";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {ProviderDecorators} from "./stories/ProviderDecorators";

export default {
    title: 'Example/AppWithRedux',
    component: AppWithRedux,
    decorators: [ProviderDecorators]
}

const Template: Story<any> = (args) =><AppWithRedux {...args} />;
const collback = action("accordion muven chenge event fired");
export const BaseExample = Template.bind({});
BaseExample.args = {

};
