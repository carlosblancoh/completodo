import React from 'react';
import GroupEditor from './GroupEditor';

export default {
    title: 'Components/GroupEditor',
    component: GroupEditor,
    parameters: {
        docs: {
            inlineStories: false,
            iframeHeight: 500,
        }
    }
};

const Template = (args) => <GroupEditor {...args} />;
export const Panel = Template.bind({});
Panel.args = {
    value: {
        title: 'Personal',
        parent: 'EjemploGrupo',
    },
};
