import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ExpandedCard from '../../components/ExpandedCard';
import Icon from '../../components/Icon';
import TopBar from '../../components/TopBar';
import BlurredOverlay from '../BlurredOverlay';
import TextField from '../TextField';
import './style.css';

/**
* Panel de recuperación de contraseña
*/
export default function PasswordRecover({ onSubmit, onBack }) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [closed, setClosed] = useState(false);

    function close() {
        setClosed(true);
        setTimeout(() => onBack(), 1000);
    }

    async function onDoneClick() {
        if (email === '') {
            setError('Debe introducir la dirección de correo electrónico que utilizó para crear su cuenta en CompleToDo para poder recuperar la contraseña.');
            setMessage(null);
        } else {
            await onSubmit(email);
            setMessage('Si existe una cuenta en CompleToDo asociada al correo electrónico introducido, se le ha enviado un email con las instrucciones necesarias para realizar el cambio de contraseña.');
            setError(null);
        }
    }

    function onBackClick() {
        close();
    }

    return (
        <>
            <BlurredOverlay visible={!closed}>
                <div className='sizeLimitter'>
                    <ExpandedCard
                        className = 'component-PasswordRecover-Popup'
                        variant = 'glass'
                    >
                        <ExpandedCard.Top>
                            <TopBar variant='noBackground'>
                                <TopBar.Left onClick = {onBackClick}>
                                    <Icon name='arrow_back_ios'/>
                                    <span style={{
                                        fontWeight:300,
                                        padding: '0.5rem'}}>Volver</span>
                                </TopBar.Left>
                                <TopBar.Right onClick = {onDoneClick}>
                                    <Icon
                                        name='done'
                                        fill= {true}
                                    />
                                </TopBar.Right>
                            </TopBar>
                        </ExpandedCard.Top>
                        <ExpandedCard.Body>
                            <div style={{
                                margin: '0 1rem 1rem 1rem',
                                textAlign: 'center',
                                opacity: '0.5',
                                fontSize: '1.2rem',
                                fontWeight: '300',
                            }}>
                            Recuperar contraseña
                            </div>
                            <div style={{
                                margin: '1rem',
                            }}>
                                <TextField
                                    placeholder='Dirección de correo electrónico'
                                    variant='email'
                                    onChange={value => setEmail(value)}
                                />
                                {message && (<span style={{
                                    display: 'block',
                                    margin: '0.5rem',
                                    textAlign: 'left',
                                }}
                                >{message}</span>)}
                                {error && (<span style={{
                                    display: 'block',
                                    margin: '0.5rem',
                                    textAlign: 'left',
                                    color: '#ff3b30',
                                }}
                                >{error}</span>)}
                            </div>
                        </ExpandedCard.Body>
                    </ExpandedCard>
                </div>
            </BlurredOverlay>
        </>
    );
}

PasswordRecover.propTypes = {
    /**
    * Evento llamado al confirmar la recuperación.
    */
    onSubmit: PropTypes.func,
    /**
    * Evento llamado al hacer cancelar la acción.
    */
    onBack: PropTypes.func,
};

PasswordRecover.defaultProps = {
    onSubmit: undefined,
    onBack: undefined,
};
