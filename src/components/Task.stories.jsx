import React from 'react';
import Task from './Task';

export default {
    title: 'Components/Task',
    component: Task,
};

const Template = (args) => <Task {...args} />;
export const Simple = Template.bind({});
Simple.args = {
    value: {
        title: 'Hacer la compra',
        completed: false,
        scheduledDate: new Date(2022, 6, 15),
        deadline: new Date(2022, 7, 15),
        priority: 1,
        difficulty: -1,
        children: [],
    },
};

export const WithSubtasks = Template.bind({});
WithSubtasks.args = {
    value: {
        title: 'Hacer la compra',
        completed: false,
        scheduledDate: new Date(2022, 6, 15),
        deadline: new Date(2022, 7, 15),
        priority: 1,
        difficulty: -1,
        children: [],
    },
};
