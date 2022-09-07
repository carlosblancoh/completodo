import React from 'react';
import SearchComponent from './Search';

export default {
    title: 'Pages/Search',
    component: SearchComponent,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const Template = (args) => <SearchComponent {...args} />;
export const Search = Template.bind({});
Search.args = {
    'items': [],
    'searchString': 'CompleToDo',
};
