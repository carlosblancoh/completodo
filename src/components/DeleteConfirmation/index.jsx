import PropTypes from 'prop-types';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Button from '../../components/Button';
import BlurredOverlay from '../BlurredOverlay';
import TextField from '../TextField';
import './style.css';


export default function DeleteConfirmation({visible, variant, onCancel, onConfirm, error}) {
    let confirmationText;
    let buttonIcon;
    let buttonText;
    let activePasswordInput = false;
    const [password, setPassword] = useState('');
    const [hide, setHide] = useState(!visible);

    useEffect(() => {
        if (visible && hide) {
            setHide(false);
        } else if (!visible && !hide) {
            setTimeout(() => setHide(true), 1000);
        }
    }, [visible]);

    if (variant === 'toTrash') {
        confirmationText = 'El elemento seleccionado y todos los elementos que contenga serán enviados a la papelera de reciclaje.';
        buttonIcon = 'delete';
        buttonText = 'Mover a la papelera';
    }  else if (variant === 'deleteBlock') {
        confirmationText = 'El evento de calendario seleccionado será eliminado permanentemente.\nEsta acción no se puede deshacer.';
        buttonIcon = 'delete_forever';
        buttonText = 'Eliminar permanentemente';
    } else if (variant === 'deleteAccount') {
        activePasswordInput = true;
        confirmationText = 'Introduce tu contraseña de CompleToDo para confirmar esta acción.\nTu cuenta en CompleToDo y todo su contenido serán eliminados permanentemente.\nEsta acción no se puede deshacer.';
        buttonIcon = 'delete_forever';
        buttonText = 'Eliminar cuenta permanentemente';
    } else {
        confirmationText = 'El elemento seleccionado y todos los elementos que contenga serán eliminados permanentemente.\nEsta acción no se puede deshacer.';
        buttonIcon = 'delete_forever';
        buttonText = 'Eliminar permanentemente';
    }
    if (hide) {
        return null;
    } else {
        return (
            <BlurredOverlay
                visible={visible}
                variant='fullscreenConfirmation'>
                <div
                    className='component-deleteConfirmationBanner'
                >
                    ¿Estás seguro?
                </div>
                <div
                    className='component-deleteConfirmationBanner'
                >
                    {confirmationText}
                </div>
                {activePasswordInput && (
                    <div style={{
                        marginBottom: '2rem',
                    }}>
                        <TextField
                            placeholder='Contraseña'
                            variant='password'
                            value={password}
                            onChange={setPassword}
                        />
                        {error && (<span style={{
                            display: 'block',
                            margin: '0.5rem',
                            textAlign: 'left',
                            color: '#ff3b30',
                        }}
                        >{error}</span>)}
                    </div>
                )}

                <Button
                    icon= {buttonIcon}
                    text= {buttonText}
                    textColor='#ff3b30'
                    onClick={() => onConfirm(password)}
                />
                <Button
                    text= 'Cancelar'
                    onClick={onCancel}
                />
            </BlurredOverlay>
        );
    }
}

DeleteConfirmation.propTypes = {
    visible: PropTypes.bool,
    variant: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    error: PropTypes.string,
};

DeleteConfirmation.defaultProps = {
    visible: undefined,
    variant: undefined,
    onCancel: undefined,
    onConfirm: undefined,
    error: undefined,
};
