import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Attribute from '../../components/Attribute';
import Button from '../../components/Button';
import ExpandedCard from '../../components/ExpandedCard';
import TopBar from '../../components/TopBar';
import TextField from '../../components/TextField';
import DeleteConfirmation from '../../components/DeleteConfirmation';
import './style.css';
import { useRef } from 'react';
import Icon from '../../components/Icon';
import PasswordEditor from '../../components/PasswordEditor';

/**
* Pantalla de perfil de usuario.
*/
export default function Profile({value, email, profilePicture, onChange, onProfilePictureChange, onViewTrash, onBack, onPasswordChange, onLogOut, onDelete}) {
    const ref = useRef(null);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [passwordEditorVisible, setPasswordEditorVisible] = useState(false);
    const [error, setError] = useState(null);

    function onUserNameChange(name) {
        onChange?.({
            ...value,
            name : name,
        });
    }

    function onAutoArchiveChange() {
        onChange?.({
            ...value,
            autoArchive : !value.autoArchive,
        });
    }

    function onPasswordChangeClick(){
        setPasswordEditorVisible(true);
    }

    function onDeleteClick(){
        setConfirmationVisible(true);
    }

    async function onDeleteToggle(password) {
        if (password === '') {
            setError('Debe introducir su contraseña actual para poder eliminar la cuenta.');
        }  else {
            try {
                if (onDelete) {
                    await onDelete?.({
                        password: password,
                    });
                }
                setError(null);
                close();
            } catch (error) {
                if (typeof error === 'string') {
                    setError(error);
                } else {
                    setError('La contraseña introducida es incorrecta.');
                }
            }
        }
    }


    return (
        <div className='fullPage' ref={ref}>
            <ExpandedCard
                variant = 'plain'
            >
                <ExpandedCard.Top>
                    <TopBar variant='noBackground'>
                        <TopBar.Left onClick = {onBack}>
                            <Icon name='arrow_back_ios'/>
                        </TopBar.Left>

                        <TopBar.Title
                            title="Perfil"
                        />
                    </TopBar>
                </ExpandedCard.Top>
                <ExpandedCard.Header>
                    <div style={{
                        textAlign: 'center',
                        width: '100%',
                    }}>
                        <div onClick={onProfilePictureChange}
                            style={{
                                background: `no-repeat center/cover url(${profilePicture})`,
                                width: '16rem',
                                height: '16rem',
                                borderRadius: '50%',
                                border: '0.06rem solid rgba(112, 112, 112, 0.5)',
                                display: 'inline-block',
                            }}
                        />
                    </div>

                </ExpandedCard.Header>
                <ExpandedCard.Body>
                    <Attribute>
                        <Attribute.Title
                            title='Nombre de usuario'
                        />
                        <Attribute.Middle>
                            <TextField
                                value= {value.name}
                                placeholder= 'Vacío'
                                variant= 'resizable'
                                onChange= {onUserNameChange}
                            />
                        </Attribute.Middle>
                    </Attribute>
                    <Attribute>
                        <Attribute.Title
                            title='Dirección de correo electrónico'
                        />
                        <Attribute.Middle>
                            <TextField
                                value= {email}
                                variant= 'resizable'
                                isDisabled
                            />
                        </Attribute.Middle>
                    </Attribute>
                    <Attribute>
                        <Attribute.Title
                            title='Archivar tareas automáticamente al completarlas'
                        />
                        <Attribute.Right onClick = {onAutoArchiveChange}>
                            <Icon name={(value.autoArchive ? 'check_box' : 'check_box_outline_blank')}/>
                        </Attribute.Right>
                    </Attribute>
                </ExpandedCard.Body>
                <ExpandedCard.Bottom>
                    {/* <Button
                        icon= 'insert_chart'
                        text= 'Ver estadísticas generales'
                        onClick={onViewTrash}
                    /> */}
                    <Button
                        icon= 'restore_from_trash'
                        text= 'Ver papelera de reciclaje'
                        onClick={onViewTrash}
                    />
                    <p style={{
                        marginTop: '0.5rem',
                        marginBottom: '0.5rem',
                    }}
                    />
                    <Button
                        icon= 'password'
                        text= 'Cambiar Contraseña'
                        onClick={onPasswordChangeClick}
                    />
                    <Button
                        textColor='#ff3b30'
                        icon= 'account_circle'
                        text= 'Cerrar sesión'
                        onClick={onLogOut}
                    />
                    <p style={{
                        marginTop: '1.5rem',
                        marginBottom: '1.5rem',
                    }}
                    />
                    <Button
                        textColor='#ff3b30'
                        icon= 'delete'
                        text= 'Eliminar cuenta'
                        onClick={onDeleteClick}
                    />
                </ExpandedCard.Bottom>
            </ExpandedCard>
            <DeleteConfirmation
                visible={confirmationVisible}
                variant='deleteAccount'
                onConfirm={onDeleteToggle}
                onCancel={()=>setConfirmationVisible(false)}
                error={error}
            />
            {(passwordEditorVisible || value.title === '') && (
                <PasswordEditor
                    onChange={onPasswordChange}
                    onBack={() => setPasswordEditorVisible(false)}
                />
            )}
        </div>

    );
}

Profile.propTypes = {
    /**
    * Contenido del perfil de usuario.
    */
    value:  PropTypes.object.isRequired,
    /**
    * Dirección de correo electrónico del usuario.
    */
    email: PropTypes.string,
    /**
    * Foto de perfil del usuario.
    */
    profilePicture: PropTypes.string,
    /**
    * Evento llamado al modificar el usuario.
    */
    onChange: PropTypes.func,
    /**
    * Evento llamado al modificar la foto de perfil del usuario.
    */
    onProfilePictureChange: PropTypes.func,
    /**
    * Evento llamado al ver la papelera de reciclaje.
    */
    onViewTrash: PropTypes.func,
    /**
    * Evento llamado al volver a la página anterior.
    */
    onBack: PropTypes.func,
    /**
    * Evento llamado al modificar la contraseña.
    */
    onPasswordChange: PropTypes.func,
    /**
    * Evento llamado al cerrar sesión.
    */
    onLogOut: PropTypes.func,
    /**
    * Evento llamado al eliminar la cuenta.
    */
    onDelete: PropTypes.func,
};

Profile.defaultProps = {
    email: undefined,
    profilePicture: undefined,
    onChange: undefined,
    onProfilePictureChange: undefined,
    onViewTrash: undefined,
    onBack: undefined,
    onPasswordChange: undefined,
    onLogOut: undefined,
    onDelete: undefined,
};
