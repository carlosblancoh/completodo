import React from 'react';
import NavBar from './NavBar';


export default {
    title: 'Components/NavBar',
    component: NavBar,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const _Template = (args) => <NavBar {...args} />;
export const home = (args) => (
    <NavBar {...args}>
        <NavBar.Tab
            icon = 'home'
            name = 'Inicio'
            active
        />
        <NavBar.Tab
            icon = 'calendar_today'
            name = 'Calendario'
        />
    </NavBar>
);
home.args = {
};
