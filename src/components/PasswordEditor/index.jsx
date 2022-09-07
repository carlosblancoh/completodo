import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ExpandedCard from '../../components/ExpandedCard';
import Icon from '../../components/Icon';
import TopBar from '../../components/TopBar';
import BlurredOverlay from '../BlurredOverlay';
import TextField from '../TextField';
import './style.css';

/**
* Panel de edición de contraseña
*/
export default function PasswordEditor({ onBack, onChange }) {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [closed, setClosed] = useState(false);

    function close() {
        setClosed(true);
        setTimeout(() => onBack(), 1000);
    }

    async function onDoneClick() {
        if (password === '') {
            setError('Debe introducir su contraseña actual para poder hacer el cambio.');
        } else if (newPassword !== repeatNewPassword) {
            setError('La contraseña nueva no coincide en ambos campos.');
        } else {
            try {
                if (onChange) {
                    await onChange?.({
                        password: password,
                        newPassword: newPassword,
                    });
                }
                setError(null);
                close();
            } catch (error){
                if (typeof error === 'string') {
                    setError(error);
                } else {
                    setError('La contraseña actual introducida es incorrecta.');
                }
            }


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
                        className = 'component-PasswordEditor-Popup'
                        variant = 'glass'
                    >
                        <ExpandedCard.Top>
                            <TopBar variant='noBackground'>
                                <TopBar.Left onClick = {onBackClick}>
                                    <Icon name='close'/>
                                    <span style={{
                                        fontWeight:300,
                                        padding: '0.5rem'}}>Cancelar</span>
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
                            Cambiar contraseña
                            </div>
                            <div style={{
                                margin: '1rem',
                            }}>
                                <TextField
                                    placeholder='Contraseña actual'
                                    variant='password'
                                    onChange={value => setPassword(value)}
                                />
                                <p style={{
                                    marginTop: '1rem',
                                    marginBottom: '1rem',
                                }}
                                />
                                <TextField
                                    placeholder='Contraseña nueva'
                                    variant='password'
                                    onChange={value => setNewPassword(value)}
                                />
                                <p style={{
                                    marginTop: '0.5rem',
                                    marginBottom: '0.5rem',
                                }}
                                />
                                <TextField
                                    placeholder='Repita la contraseña nueva'
                                    variant='password'
                                    onChange={value => setRepeatNewPassword(value)}
                                />
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

PasswordEditor.propTypes = {
    /**
    * Evento llamado cancelar la acción.
    */
    onBack: PropTypes.func,
    /**
    * Evento llamado al cambiar la contraseña.
    */
    onChange: PropTypes.func,
};

PasswordEditor.defaultProps = {
    onBack: undefined,
    onChange: undefined,
};
