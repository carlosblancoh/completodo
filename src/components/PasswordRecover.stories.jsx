import React from 'react';
import PasswordRecover from './PasswordRecover';

export default {
    title: 'Components/PasswordRecover',
    component: PasswordRecover,
    parameters: {
        docs: {
            inlineStories: false,
            iframeHeight: 200,
        }
    }
};

const Template = (args) => <PasswordRecover {...args} />;
export const Panel = Template.bind({});
Panel.args = {

};
