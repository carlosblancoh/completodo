import React from 'react';
import Button from './Button';


export default {
    title: 'Components/Button',
    component: Button,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const Template = (args) => <Button {...args} />;
export const JustText = Template.bind({});
JustText.args = {
    text: 'Texto',
};
export const JustIcon = Template.bind({});
JustIcon.args = {
    icon: 'add',
};
export const IconAndText = Template.bind({});
IconAndText.args = {
    icon: 'add',
    text: 'Texto',
};
