import React from 'react';
import TextField from './TextField';


export default {
    title: 'Components/TextField',
    component: TextField,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const Template = (args) => <TextField {...args} />;

export const basic = Template.bind({});
basic.args = {
    placeholder:'Nombre',
    variant: 'default',
};
export const noBackground = Template.bind({});
noBackground.args = {
    placeholder:'Título',
    variant: 'noBackground',
};
export const search = Template.bind({});
search.args = {
    placeholder:'Busca aquí lo que quieras.',
    variant: 'search',
};
