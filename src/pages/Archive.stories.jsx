import React from 'react';
import ArchiveComponent from './Archive';

export default {
    title: 'Pages/Archive',
    component: ArchiveComponent,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const Template = (args) => <ArchiveComponent {...args} />;
export const Archive = Template.bind({});
Archive.args = {
    'items': [],
};
