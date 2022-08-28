import React from 'react';
import TaskDetailComponent from './TaskDetail';

export default {
    title: 'Pages/TaskDetail',
    component: TaskDetailComponent,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const Template = (args) => <TaskDetailComponent {...args} />;
export const TaskDetail = Template.bind({});
TaskDetail.args = {
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
