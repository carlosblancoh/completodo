import React from 'react';
import Note from './Note';

export default {
    title: 'Components/Note',
    component: Note,
};

const Template = (args) => <Note {...args} />;
export const Simple = Template.bind({});
Simple.args = {
    value: {
        title: 'Título de la nota',
        scheduledDate: new Date(2022, 6, 15),
        priority: 1,
    },
};

export const WithContent = Template.bind({});
WithContent.args = {
    value: {
        title: 'Título de la nota',
        text: 'Contenido de la nota',
        scheduledDate: new Date(2022, 6, 15),
        priority: -1,
    },
};
