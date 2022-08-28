import React from 'react';
import Register from './Register';

export default {
    title: 'Pages/Register',
    component: Register,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const Template = (args) => <Register {...args} />;
export const register = Template.bind({});
register.args = {
    onRegister: onRegisterFail,
};

function onRegisterFail(_username, _email, _password) {
    return {
        success: false,
        errors: {
            username: 'Error de nombre de usuario.',
            email: 'Error de correo electrónico.',
            password: 'Error de contraseña.',
        }
    };
}
