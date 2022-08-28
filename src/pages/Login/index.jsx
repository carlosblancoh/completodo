import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Icon from '../../components/Icon';
import TextField from '../../components/TextField';
import PasswordRecover from '../../components/PasswordRecover';


export default function Login({onLogin, onRecoverPassord}) {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[errors, setErrors] = useState({});
    const[forgottenPasswordFormVisible, setForgottenPasswordFormVisible] = useState(false);
    const [expandedTutorial1, setExpandedTutorial1] = useState(false);
    const [expandedTutorial2, setExpandedTutorial2] = useState(false);
    const [expandedTutorial3, setExpandedTutorial3] = useState(false);
    const [expandedTutorial4, setExpandedTutorial4] = useState(false);

    const navigate = useNavigate();

    async function onSubmit(event) {
        event.preventDefault();
        if (onLogin !== undefined) {
            const result = await onLogin(email, password);
            setErrors(result.errors);
        }
    }

    function onArrowClick1() {
        setExpandedTutorial1(!expandedTutorial1);
    }

    function onArrowClick2() {
        setExpandedTutorial2(!expandedTutorial2);
    }

    function onArrowClick3() {
        setExpandedTutorial3(!expandedTutorial3);
    }

    function onArrowClick4() {
        setExpandedTutorial4(!expandedTutorial4);
    }

    function viewForgottenPasswordForm() {
        setForgottenPasswordFormVisible(true);
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
                padding: '2rem 0',
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
                        ¡Bienvenido!
                        </div>
                        <div>
                            <Card
                                variant='plain'
                                stackable
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
                                        text='Iniciar sesión con correo electrónico'
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
                            <Card
                                variant='plain'
                                stackable
                            >
                                <div onSubmit={onSubmit}
                                    style={{
                                        margin: '0 0.5rem 0.5rem 0.5rem',
                                        textAlign: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '300',
                                    }}><p style={{
                                        marginTop: '0.25rem',
                                        marginBottom: '0.25rem',
                                    }}
                                    />
                                    ¿Has olvidado tu contraseña?
                                    <Button
                                        text='Recuperar Contraseña'
                                        onClick={viewForgottenPasswordForm}
                                        textColor='black'
                                    />
                                </div>
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
                                        text='Iniciar sesión con Google'
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
                                    justifyContent: 'center',
                                    fontWeight: '300',
                                }}>
                                ¿Todavía no tienes cuenta?
                                <Button
                                    text='Crear una cuenta nueva'
                                    onClick={() => navigate('/register')}
                                    textColor='black'
                                />
                            </div>
                        </Card>
                    </div>
                </Card>
                <p style={{
                    marginTop: '1.5rem',
                    marginBottom: '1.5rem',
                }}
                />
                <Card
                    variant='plain'
                >
                    <div onSubmit={onSubmit}
                        style={{
                            margin: '2rem 0.2rem 1rem 0.2rem',
                            textAlign: 'center',
                        }}>
                        <div style={{
                            margin: '0 1rem 1rem 1rem',
                            textAlign: 'center',
                            opacity: '0.5',
                            fontSize: '1.5rem',
                            fontWeight: '300',
                        }}>
                        Sobre CompleToDo
                        </div>
                        <div>
                            <Card
                                variant='plain'
                            >
                                <div onSubmit={onSubmit}
                                    style={{
                                        padding: '0.25rem 0.5rem 0 0.5rem',
                                        textAlign: 'center',
                                    }}>
                                    <p style={{
                                        marginTop: '0.25rem',
                                        marginBottom: '0.25rem',
                                    }}
                                    />
                                    <div style={{
                                        margin: '1rem',
                                        textAlign: 'center',
                                        fontWeight: '300',
                                    }}>
                                        <div style={{
                                            display: 'inline-block',
                                            textAlign: 'left',
                                        }}>
                                        ¡Completodo es la aplicación definitiva que te ayudará a completar todo lo que te propongas!
                                        </div>
                                        <p style={{
                                            marginTop: '-0.5rem',
                                            marginBottom: '-0.75rem',
                                        }}
                                        />
                                        <ul style={{
                                            display: 'inline-block',
                                            textAlign: 'left',
                                            color: '#65C582',
                                        }}>
                                            <li>
                                                <span style={{
                                                    color: 'black',
                                                }}>Puedes crear notas y tareas, y organizarlas en grupos como más te guste.
                                                </span>
                                            </li>
                                            <li>
                                                <span style={{
                                                    color: 'black',
                                                }}>Planifica tu tiempo creando eventos en el calendario.
                                                </span>
                                            </li>
                                            <li>
                                                <span style={{
                                                    color: 'black',
                                                }}>Completodo te recordará todo cada día, ¡para que no se te escape nada!
                                                </span>
                                            </li>
                                            <li>
                                                <span style={{
                                                    color: 'black',
                                                }}>Descubre en qué inviertes tu tiempo y mejora tu productividad.
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <p style={{
                            marginTop: '1rem',
                            marginBottom: '1rem',
                        }}
                        />
                        <div style={{
                            margin: '0 1rem 1rem 1rem',
                            textAlign: 'center',
                            opacity: '0.5',
                            fontSize: '1.5rem',
                            fontWeight: '300',
                        }}>
                        ¡Mejora tu experiencia!
                        </div>
                        <Card
                            variant='plain'
                            stackable
                        >
                            <Card.Header>
                                <Card.Header.Left>
                                    <img src='/IconSample.png'
                                        style={{
                                            width: '3rem',
                                        }}
                                    />
                                </Card.Header.Left>
                                <span style={{
                                    fontWeight: '300',
                                    textAlign: 'left',
                                    margin: '1rem',
                                }}>
                                    Añade CompleToDo como aplicación en tu dispositivo para una experiencia más inmerisiva. ¡Es muy fácil!
                                </span>
                            </Card.Header>
                        </Card>
                        <Card onClick={onArrowClick1}
                            variant='plain'
                            stackable
                        >
                            <Card.Header>
                                <Card.Header.Right>
                                </Card.Header.Right>
                                <span style={{
                                    fontWeight: '300',
                                    textAlign: 'center',
                                    margin: '0 1.5rem -0.25 1.5rem',
                                }}>
                                    Dispositivos iOS, iPhone o iPad
                                </span>
                                <Card.Header.Right>
                                    <span
                                        style={{
                                            transform: `rotate(${expandedTutorial1 ? '180deg' : '0deg'}) translateY(${expandedTutorial1 ? '0.3rem' : '0'})`,
                                            transition: 'transform 0.5s',
                                        }}
                                    >
                                        <Icon name='expand_more'/>
                                    </span>
                                </Card.Header.Right>
                            </Card.Header>
                            <Card.Body collapsed={!expandedTutorial1}>
                                <Card>
                                    <Card.Header>
                                        <span style={{
                                            fontWeight: '300',
                                            textAlign: 'left',
                                            margin: '0 0.5rem 0.5rem 1rem',
                                        }}>
                                            Entra en &#34;<Icon name='ios_share' weight={100}/>&#34;, &#34;Añadir a pantalla de inicio <Icon name='add_box' weight={100}/>&#34; y selecciona &#34;Añadir&#34;.
                                        </span>
                                    </Card.Header>
                                </Card>
                            </Card.Body>
                        </Card>
                        <Card onClick={onArrowClick2}
                            variant='plain'
                            stackable
                        >
                            <Card.Header>
                                <Card.Header.Right>
                                </Card.Header.Right>
                                <span style={{
                                    fontWeight: '300',
                                    textAlign: 'center',
                                    margin: '0 1.5rem -0.25 1.5rem',
                                }}>
                                    Dispositivos Android, teléfonos o tabletas
                                </span>
                                <Card.Header.Right>
                                    <span
                                        style={{
                                            transform: `rotate(${expandedTutorial2 ? '180deg' : '0deg'}) translateY(${expandedTutorial2 ? '0.3rem' : '0'})`,
                                            transition: 'transform 0.5s',
                                        }}
                                    >
                                        <Icon name='expand_more'/>
                                    </span>
                                </Card.Header.Right>
                            </Card.Header>
                            <Card.Body collapsed={!expandedTutorial2}>
                                <Card>
                                    <Card.Header>
                                        <span style={{
                                            fontWeight: '300',
                                            textAlign: 'left',
                                            margin: '0 0.5rem 0.5rem 1rem',
                                        }}>
                                            Entra en &#34;<Icon name='more_vert' weight={100}/>&#34;, busca &#34;<Icon name='add_to_home_screen' weight={100}/>Añadir a pantalla de inicio&#34; y selecciona &#34;Añadir&#34;.
                                        </span>
                                    </Card.Header>
                                </Card>
                            </Card.Body>
                        </Card>
                        <Card onClick={onArrowClick3}
                            variant='plain'
                            stackable
                        >
                            <Card.Header>
                                <Card.Header.Right>
                                </Card.Header.Right>
                                <span style={{
                                    fontWeight: '300',
                                    textAlign: 'center',
                                    margin: '0 1.5rem -0.25 1.5rem',
                                }}>
                                    Chrome en escritorio
                                </span>
                                <Card.Header.Right>
                                    <span
                                        style={{
                                            transform: `rotate(${expandedTutorial3 ? '180deg' : '0deg'}) translateY(${expandedTutorial3 ? '0.3rem' : '0'})`,
                                            transition: 'transform 0.5s',
                                        }}
                                    >
                                        <Icon name='expand_more'/>
                                    </span>
                                </Card.Header.Right>
                            </Card.Header>
                            <Card.Body collapsed={!expandedTutorial3}>
                                <Card>
                                    <Card.Header>
                                        <span style={{
                                            fontWeight: '300',
                                            textAlign: 'left',
                                            margin: '0 0.5rem 0.5rem 1rem',
                                        }}>
                                            En el menú &#34;<Icon name='more_vert' weight={100}/>&#34;, busca &#34;Más herramientas&#34;, &#34;Crear acceso directo...&#34;, marca la opción &#34;Abrir como ventana&#34; y haz clic en &#34;Crear&#34;.
                                        </span>
                                    </Card.Header>
                                </Card>
                            </Card.Body>
                        </Card>
                        <Card onClick={onArrowClick4}
                            variant='plain'
                            stackable
                        >
                            <Card.Header>
                                <Card.Header.Right>
                                </Card.Header.Right>
                                <span style={{
                                    fontWeight: '300',
                                    textAlign: 'center',
                                    margin: '0 1.5rem -0.25 1.5rem',
                                }}>
                                    Edge en escritorio
                                </span>
                                <Card.Header.Right>
                                    <span
                                        style={{
                                            transform: `rotate(${expandedTutorial4 ? '180deg' : '0deg'}) translateY(${expandedTutorial4 ? '0.3rem' : '0'})`,
                                            transition: 'transform 0.5s',
                                        }}
                                    >
                                        <Icon name='expand_more'/>
                                    </span>
                                </Card.Header.Right>
                            </Card.Header>
                            <Card.Body collapsed={!expandedTutorial4}>
                                <Card>
                                    <Card.Header>
                                        <span style={{
                                            fontWeight: '300',
                                            textAlign: 'left',
                                            margin: '0 0.5rem 0.5rem 1rem',
                                        }}>
                                            En el menú &#34;<Icon name='more_horiz' weight={100}/>&#34;, busca &#34;<Icon name='widgets' weight={100}/>Aplicaciones&#34;, &#34;Instalar este sitio como una aplicación&#34; y haz clic en &#34;Instalar&#34;.
                                        </span>
                                    </Card.Header>
                                </Card>
                            </Card.Body>
                        </Card>
                    </div>
                </Card>
                <p style={{
                    marginTop: '1.5rem',
                    marginBottom: '1.5rem',
                }}
                />
                <Card
                    variant='plain'
                >
                    <div onSubmit={onSubmit}
                        style={{
                            margin: '2rem 0.2rem 1rem 0.2rem',
                            textAlign: 'center',
                        }}>
                        <div style={{
                            margin: '0 1rem 1rem 1rem',
                            textAlign: 'center',
                            opacity: '0.5',
                            fontSize: '1.5rem',
                            fontWeight: '300',
                        }}>
                        Sobre el desarrollador
                        </div>
                        <div>
                            <Card
                                variant='plain'
                            >
                                <div
                                    style={{
                                        padding: '0.25rem 0.5rem 0 0.5rem',
                                        textAlign: 'center',
                                    }}>
                                    <p style={{
                                        marginTop: '0.25rem',
                                        marginBottom: '0.25rem',
                                    }}
                                    />
                                    <div style={{
                                        margin: '1rem',
                                        textAlign: 'center',
                                        fontWeight: '300',
                                    }}>
                                        <div style={{
                                            display: 'inline-block',
                                            textAlign: 'left',
                                        }}>
                                        CompleToDo es el resultado del trabajo de fin de grado de Carlos Blanco Herrero bajo la dirección de Roberto Therón Sánchez.
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Card>
            </div>
            {forgottenPasswordFormVisible && (
                <PasswordRecover
                    onSubmit={onRecoverPassord}
                    onBack={() => setForgottenPasswordFormVisible(false)}
                />
            )}
        </div>
    );
}

Login.propTypes = {
    onLogin: PropTypes.func,
    onRecoverPassord: PropTypes.func,
};

Login.defaultProps = {
    onLogin: undefined,
    onRecoverPassord: undefined,
};
