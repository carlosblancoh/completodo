import React from 'react';
import Icon from './Icon';


export default {
    title: 'Components/Icon',
    component: Icon,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
};

const Template = (args) => <Icon {...args} />;

export const AddAPhoto = Template.bind({});
AddAPhoto.args = {
    name: 'add_a_photo',
};

export const Add = Template.bind({});
Add.args = {
    name: 'add',
};
