import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import TextField from '../../components/TextField';


/**
* Pantalla de registro de usuarios.
*/
export default function Register({onRegister}) {
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[errors, setErrors] = useState({});
    const navigate = useNavigate();

    let mounted = true;
    useEffect(
        () => {
            mounted = true;
            return () => mounted = false;
        },
        [],
    );

    async function onSubmit(event) {
        event.preventDefault();
        if (onRegister !== undefined) {
            const result = await onRegister(username, email, password);
            if (mounted) {
                setErrors(result.errors);
            }
        }
    }

    return (
        <div className='background'
            style={{
                background:'linear-gradient(131.78deg, #75CF88 15.26%, #50B87A 48.32%, #43967D 85.01%)',
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
                width: '100%',
                justifyContent: 'center',
                padding: '1rem 0',
            }}
        >
            <div style={{
                filter: 'drop-shadow(0.2rem 0.2rem 0.4rem rgba(0, 0, 0, 0.25))',
            }}>
                <Card
                    variant='plain'
                >
                    <div onSubmit={onSubmit}
                        style={{
                            margin: '2rem 0.2rem 1rem 0.2rem',
                            textAlign: 'center',
                        }}>
                        <img src='/banner0.png'
                            style={{
                                width: 'min(calc(100% - 2rem), 480px)',
                            }}
                        />
                        <div style={{
                            margin: '0 1rem 1rem 1rem',
                            textAlign: 'center',
                            opacity: '0.5',
                            fontSize: '1.5rem',
                            fontWeight: '300',
                        }}>
                            Crea tu nueva cuenta.
                        </div>
                        <div>
                            <Card
                                variant='plain'
                            >
                                <form onSubmit={onSubmit}
                                    style={{
                                        margin: '1rem 0.5rem 0 0.5rem',
                                        textAlign: 'center',
                                    }}>
                                    <p style={{
                                        marginTop: '0.5rem',
                                        marginBottom: '0.5rem',
                                    }}
                                    />
                                    <TextField
                                        placeholder='Nombre de usuario'
                                        value= {username}
                                        onChange={setUsername}
                                    />
                                    {errors.username && (<span style={{
                                        display: 'block',
                                        margin: '0.5rem',
                                        textAlign: 'left',
                                        color: '#ff3b30',
                                    }}
                                    >{errors.username}</span>)}
                                    <p style={{
                                        marginTop: '0.5rem',
                                        marginBottom: '0.5rem',
                                    }}
                                    />
                                    <TextField
                                        placeholder='Dirección de correo electrónico'
                                        value= {email}
                                        onChange={setEmail}
                                        variant='email'
                                    />
                                    {errors.email && (<span style={{
                                        display: 'block',
                                        margin: '0.5rem',
                                        textAlign: 'left',
                                        color: '#ff3b30',
                                    }}
                                    >{errors.email}</span>)}
                                    <p style={{
                                        marginTop: '0.5rem',
                                        marginBottom: '0.5rem',
                                    }}
                                    />
                                    <TextField
                                        placeholder='Contraseña'
                                        value= {password}
                                        onChange={setPassword}
                                        variant='password'
                                    />
                                    {errors.password && (<span style={{
                                        display: 'block',
                                        margin: '0.5rem',
                                        textAlign: 'left',
                                        color: '#ff3b30',
                                    }}
                                    >{errors.password}</span>)}
                                    {errors.other && (<span style={{
                                        display: 'block',
                                        margin: '0.5rem',
                                        textAlign: 'left',
                                        color: '#ff3b30',
                                    }}
                                    >{errors.other}</span>)}
                                    <p style={{
                                        marginTop: '0.5rem',
                                        marginBottom: '0.5rem',
                                    }}
                                    />
                                    <Button
                                        text='Crear cuenta'
                                        onClick={onSubmit}
                                        textColor='white'
                                        color='#65C582'
                                    />
                                    <p style={{
                                        marginTop: '0.5rem',
                                        marginBottom: '0.5rem',
                                    }}
                                    />
                                </form>
                            </Card>
                            {/* <Card
                                variant='plain'
                                stackable
                            >
                                <form onSubmit={onSubmit}
                                    style={{
                                        padding: '0.25rem 0.5rem 0 0.5rem',
                                        textAlign: 'center',
                                    }}>
                                    <p style={{
                                        marginTop: '0.25rem',
                                        marginBottom: '0.25rem',
                                    }}
                                    />
                                    <Button
                                        text='Crear cuenta con Google'
                                        onClick={onSubmit}
                                        textColor='black'
                                    />
                                </form>
                            </Card> */}
                        </div>
                        <p style={{
                            marginTop: '1rem',
                            marginBottom: '1rem',
                        }}
                        />
                        <Card variant='plain'>
                            <div onSubmit={onSubmit}
                                style={{
                                    margin: '0.75rem 0.5rem 0.5rem 0.5rem',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                            ¿Ya tienes una cuenta?
                                <Button
                                    text='Iniciar sesión'
                                    onClick={() => navigate('/login')}
                                    textColor='black'
                                />
                            </div>
                        </Card>
                    </div>
                </Card>
            </div>
        </div>
    );
}

Register.propTypes = {
    /**
    * Evento llamado al registrar un nuevo usuario.
    */
    onRegister: PropTypes.func,
};

Register.defaultProps = {
    onRegister: undefined,
};
