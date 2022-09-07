import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';

export default {
    title: 'Pages/Register',
    component: Register,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const Template = (args) => {
    return (
        <BrowserRouter>
            <Register {...args} />
        </BrowserRouter>
    );
};
export const register = Template.bind({});
register.args = {
    onRegister: onRegisterFail,
};

function onRegisterFail(_email, _password) {
    return {
        success: false,
        errors: {
            username: 'Error de nombre de usuario.',
            email: 'Error de correo electrónico.',
        }
    };
}
