import React from 'react';
import BlockDetailComponent from './BlockDetail';

export default {
    title: 'Pages/BlockDetail',
    component: BlockDetailComponent,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const Template = (args) => <BlockDetailComponent {...args} />;
export const BlockDetail = Template.bind({});
BlockDetail.args = {
    value: {
        'group': null,
        'duration': 7200,
        'completed': false,
        'completionDate': null,
        'type': 'block',
        'creationDate': {toDate() {return new Date();}},
        'location': '',
        'completable': false,
        'date': {toDate() {return new Date();}},
        'color': '#e9b44c',
        'text': '',
        'title': 'Curso de alemán'
    },
};
