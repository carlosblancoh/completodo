import React from 'react';
import TrashComponent from './Trash';

export default {
    title: 'Pages/Trash',
    component: TrashComponent,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const Template = (args) => <TrashComponent {...args} />;
export const Trash = Template.bind({});
Trash.args = {
    'items': [],
};
