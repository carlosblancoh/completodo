import React from 'react';
import FAB, { ComposedFAB } from './FAB';


export default {
    title: 'Components/Floating Action Button',
    component: FAB,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
    parameters: {
        docs: {
            inlineStories: false,
        }
    }
};

const Template = (args) => <FAB {...args} />;
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
export const JustTextSmall = Template.bind({});
JustTextSmall.args = {
    text: 'Texto',
    small: true,
};
export const JustIconSmall = Template.bind({});
JustIconSmall.args = {
    icon: 'add',
    small: true,
};
export const IconAndTextSmall = Template.bind({});
IconAndTextSmall.args = {
    icon: 'add',
    text: 'Texto',
    small: true,
};
export const IconAndTextPurple = Template.bind({});
IconAndTextPurple.args = {
    icon: 'add',
    text: 'Texto',
    small: false,
    color: '#7c6fff',
};

export const Expanded = (args) => {
    return <ComposedFAB {...args} />;
};

Expanded.args = {
    icon: 'add',
    small: false,
    actions: [
        {
            icon: 'add',
            text: 'Texto',
        },{
            icon: 'add',
            text: 'Texto',
        }
    ]
};
