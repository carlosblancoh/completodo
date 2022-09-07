import React from 'react';
import Block from './Block';

export default {
    title: 'Components/Block',
    component: Block,
};

const Template = (args) => <Block {...args} />;
export const Simple = Template.bind({});
Simple.args = {
    'value': {
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
