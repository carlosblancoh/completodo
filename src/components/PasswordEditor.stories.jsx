import React from 'react';
import PasswordEditor from './PasswordEditor';

export default {
    title: 'Components/PasswordEditor',
    component: PasswordEditor,
    parameters: {
        docs: {
            inlineStories: false,
            iframeHeight: 500,
        }
    }
};

const Template = (args) => <PasswordEditor {...args} />;
export const Panel = Template.bind({});
Panel.args = {

};
