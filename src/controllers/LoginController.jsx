import { signInWithEmailAndPassword, getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useIsLoggedIn } from '../hooks/user';
import Login from '../pages/Login';


export default function LoginController() {
    const navigate = useNavigate();
    const isLoggedIn = useIsLoggedIn();


    async function onLogin(email, password) {
        let result = {
            success: true,
            errors: {}
        };
        const emailError = validateEmail(email);
        if (emailError !== undefined) {
            result.success = false;
            result.errors.email = emailError;
        }
        const passwordError = validatePassword(password);
        if (passwordError !== undefined) {
            result.success = false;
            result.errors.password = passwordError;
        }

        if (result.success) {
            const loginResult = await login(email, password);
            if (loginResult.success) {
                navigate('/');
            } else {
                result.success = false;
                result.errors.other = loginResult.error;
            }
        }

        return result;
    }

    async function onRecoverPassord(email) {
        const auth = getAuth();
        await sendPasswordResetEmail(auth, email);
    }

    function validateEmail(email) {
        if (email.length === 0){
            return 'El correo electrónico no puede estar vacío.';
        }
        // eslint-disable-next-line no-control-regex
        if (/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.exec(email) === null) {
            return 'El correo electrónico introducido no es válido.';
        }
        return undefined;
    }

    function validatePassword(password) {
        if (password.length > 128){
            return 'La contraseña introducida es demasiado larga.';
        }
        if (password.length === 0){
            return 'Debe introducir su contraseña para acceder.';
        }
        return undefined;
    }

    async function login(email, password) {
        try {
            const credential = await signInWithEmailAndPassword(auth, email, password);
            // Signed in
            return {
                success: true,
                user: credential.user,
            };
        } catch(error) {
            return {
                success: false,
                error: 'Dirección de correo electrónico o contraseña incorrectas.',
            };
        }
    }

    if (isLoggedIn) {
        return (
            <Navigate to = '/'/>
        );
    } else {
        return (
            <Login
                onLogin={onLogin}
                onRecoverPassord= {onRecoverPassord}
            />
        );
    }
}
