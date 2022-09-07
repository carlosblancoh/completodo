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
    'id': 'HCqgO7V6yxJBGP6UFmnW',
    'value': {
        'difficulty': 0,
        'scheduledDate': null,
        'completionDate': null,
        'title': 'Entregar Memoria',
        'group': 'Vx7cztPGaMKAH9lw2Y1N',
        'deadline': null,
        'parent': 'Vx7cztPGaMKAH9lw2Y1N',
        'creationDate': {toDate(){return new Date();}},
        'visibility': 'normal',
        'timerStartTime': null,
        'location': '',
        'isPaused': true,
        'duration': 0,
        'priority': 2,
        'type': 'task',
        'completed': false,
        'children': [],
        'hasDuration': false,
        'text': ''
    },
    'subItems': [],
    'hasArchivedItems': false,
    'parent': {
        'type': 'group',
        'color': '#541107',
        'notes': 3,
        'deadline': {toDate(){return new Date();}},
        'visibility': 'pinned',
        'subgroups': 4,
        'parent': 'nXN3eLlMpoBU705uZoWT',
        'group': 'nXN3eLlMpoBU705uZoWT',
        'pendingTasks': 1,
        'title': 'TFG'
    },
    'parentColor': '#541107',
    'groupsList': [],
};
