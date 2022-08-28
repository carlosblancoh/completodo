import React from 'react';
import Group from './Group';

export default {
    title: 'Components/Group',
    component: Group,
};

const Template = (args) => <Group {...args} />;
export const Simple = Template.bind({});
Simple.args = {
    value: {
        title: 'Personal',
        children: [],
    },
};

export const WithSubtasks = Template.bind({});
WithSubtasks.args = {
    value: {
        title: 'Personal',
        children: [1, 3, 4, 5],
        subgroups: 3,
        pendingTasks: 1,
        color: '#ff9500',
    },
};
