import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

export default {
    title: 'Pages/Login',
    component: Login,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const Template = (args) => {
    return (
        <BrowserRouter>
            <Login {...args} />
        </BrowserRouter>
    );
};
export const login = Template.bind({});
login.args = {
    onLogin: onLoginFail,
};

function onLoginFail(_email, _password) {
    return {
        success: false,
        errors: {
            username: 'Error de nombre de usuario.',
            email: 'Error de correo electrónico.',
        }
    };
}
