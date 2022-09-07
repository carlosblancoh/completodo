import React from 'react';
import StatsViewer from './StatsViewer';

export default {
    title: 'Components/StatsViewer',
    component: StatsViewer,
    parameters: {
        docs: {
            inlineStories: false,
            iframeHeight: 500,
        }
    }
};

const Template = (args) => <StatsViewer {...args} />;
export const Panel = Template.bind({});
Panel.args = {
    value: {
        'color': '#541107',
        'notes': 3,
        'tasks': 1,
        'groups': 3,
        'notesP': 0.42857142857142855,
        'tasksP': 0.14285714285714285,
        'groupsP': 0.42857142857142855,
        'completedTasks': 7,
        'uncompletedTasks': 1,
        'totalTasksCreated': 8,
        'completedTasksP': 0.875,
        'tasksCompletedOnTime': 6,
        'tasksCompletedOnTimeP': 0.8571428571428571,
        'tasksCompletedLate': 0.14285714285714285,
        'overdueTasks': 0,
        'overdueTasksP': 0,
        'tasksOnTime': 1,
        'totalWorkingTime': 0,
        'completedTimedTasks': 0,
        'meanTaskTime': null,
        'archivedItems': 7,
        'totalItems': 14,
        'archived': 0.5
    },
};
