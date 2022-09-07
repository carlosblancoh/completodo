import React from 'react';
import DeleteConfirmation from './DeleteConfirmation';

export default {
    title: 'Components/DeleteConfirmation',
    component: DeleteConfirmation,
    parameters: {
        docs: {
            inlineStories: false,
            iframeHeight: 500,
        }
    }
};

const Template = (args) => <DeleteConfirmation {...args} />;
export const Panel = Template.bind({});
Panel.args = {
    visible: true,
    variant: 'toTrash',
    error: 'PropTypes.string',
};
