import React from 'react';
import HomeComponent from './Home';

export default {
    title: 'Pages/Home',
    component: HomeComponent,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const Template = (args) => <Home {...args} />;
export const Home = Template.bind({});
Home.args = {
};
