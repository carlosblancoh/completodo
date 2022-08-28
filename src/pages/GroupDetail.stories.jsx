import React from 'react';
import GroupDetailComponent from './GroupDetail';

export default {
    title: 'Pages/GroupDetail',
    component: GroupDetailComponent,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const Template = (args) => <GroupDetailComponent {...args} />;
export const GroupDetail = Template.bind({});
GroupDetail.args = {
    value: {
        title: 'Personal',
        children: [1, 3, 4, 5],
        subgroups: 3,
        pendingTasks: 1,
        color: '#ff9500',
    },
};
