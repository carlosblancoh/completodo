import React from 'react';
import NoteDetailComponent from './NoteDetail';

export default {
    title: 'Pages/NoteDetail',
    component: NoteDetailComponent,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const Template = (args) => <NoteDetailComponent {...args} />;
export const NoteDetail = Template.bind({});
NoteDetail.args = {
    'value': {
        'text': '6 aguacates\nZumo de 1 limón\n1 cebolla normal\nCilantro\nTomate\nPimienta\nSal\n\nSe pela y tritura el aguacate.\nSe coloca en un bol con el resto de ingredientes\nSe pela y se añade la cebolla\n\nSe integran todos los ingredientes',
        'scheduledDate': null,
        'visibility': 'pinned',
        'creationDate': {toDate(){return new Date();}},
        'title': 'Guacamole de Ana',
        'priority': 0,
        'parent': 'fEvjLloEXvquoprSzoGP',
        'group': 'fEvjLloEXvquoprSzoGP',
        'type': 'note',
        'location': ''
    },
    'parent': {
        'title': 'Recetas',
        'color': '#fdc700',
        'children': [],
        'deadline': null,
        'subgroups': 4,
        'group': null,
        'notes': 4,
        'type': 'group',
        'pendingTasks': 0,
        'visibility': 'pinned',
        'parent': null
    },
    'parentColor': '#fdc700',
    'groupsList': [],
};
