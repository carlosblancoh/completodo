import { AuthErrorCodes, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { useIsLoggedIn } from '../hooks/user';
import Register from '../pages/Register';

export default function RegisterController() {
    const navigate = useNavigate();
    const isLoggedIn = useIsLoggedIn();

    async function onRegister(username, email, password) {
        let result = {
            success: true,
            errors: {},
        };
        const usernameError = validateUsername(username);
        if (usernameError !== undefined) {
            result.success = false;
            result.errors.username = usernameError;
        }
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
            const registerResult = await register(username, email, password);
            if (registerResult.success) {
                navigate('/');
            } else {
                result.success = false;
                result.errors.other = registerResult.error;
            }
        }

        return result;
    }

    function validateUsername(username) {
        if (username.length === 0){
            return 'El nombre de usuario no puede estar vacío.';
        }
        if (username.length < 3){
            return 'El nombre de usuario es demasiado corto.';
        }
        if (username.length > 32){
            return 'El nombre de usuario es demasiado largo.';
        }
        if (/^[a-zA-Z0-9_ -]+$/.exec(username) === null) {
            return 'El nombre de usuario solo puede contener letras, números, espacios, guión alto y guión bajo.';
        }
        return undefined;
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
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/.exec(password) === null) {
            return 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.';
        }
        return undefined;
    }

    async function register(username, email, password) {
        try {
            const credential = await createUserWithEmailAndPassword(auth, email, password);
            const id = credential.user.uid;
            const reference = doc(db, 'users', id);
            await setDoc(reference, {
                name: username,
                profilePicture: '/profile-pictures/default.png',
                autoArchive: true,
            });
            return {
                success: true,
                user: credential.user,
            };
        } catch (error) {
            switch (error.code) {
            case AuthErrorCodes.EMAIL_EXISTS:
                return {
                    success: false,
                    error: 'El correo electrónico introducido ya está registrado en CompleToDo.',
                };
            default:
                return {
                    success: false,
                    error: `Se ha producido un error desconocido (${error.code}).`,
                };
            }
        }
    }
    if (isLoggedIn) {
        return (
            <Navigate to = '/'/>
        );
    } else {
        return (
            <Register onRegister={onRegister}/>
        );
    }
}
