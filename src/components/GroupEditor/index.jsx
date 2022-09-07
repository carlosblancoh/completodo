import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Attribute from '../../components/Attribute';
import Button from '../../components/Button';
import ExpandedCard from '../../components/ExpandedCard';
import Icon from '../../components/Icon';
import TopBar from '../../components/TopBar';
import BlurredOverlay from '../BlurredOverlay';
import DeleteConfirmation from '../DeleteConfirmation';
import TextField from '../TextField';
import './style.css';

/**
* Panel de edición de grupo.
*/
export default function GroupEditor({value, onBack, onCloseEditor, onChange, groupsList, onDelete}) {
    const [title, setTitle] = useState(value?.title ?? '');
    const [parent, setParent] = useState(value?.parent ?? '');
    const [color, setColor] = useState(value?.color ?? '');
    const [deadline, setDeadline] = useState(dateConversion(value?.deadline) ?? '');
    const [error, setError] = useState(null);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [closed, setClosed] = useState(false);
    let editorTitle;
    let archiveIcon;
    let archiveText;
    let deleteText;

    if (value.title === '') {
        editorTitle = 'Crear grupo';
    } else {
        editorTitle = 'Editar grupo';
    }

    function close() {
        setClosed(true);
        setTimeout(() => onCloseEditor(), 1000);
    }

    function onDoneClick() {
        let newDeadline;
        if (deadline !== '') {
            newDeadline = new Date(deadline);
        } else {
            newDeadline = null;
        }

        if (title.trim() === '') {
            setError('El nombre del grupo no puede estar vacío.');
        } else {
            setError(null);
            onChange?.({
                ...value,
                title : title.trim(),
                color: color,
                deadline: newDeadline,
                parent: (parent === '') ? null : parent,
                group: (parent === '') ? null : parent,
            });
            close();
        }
    }

    function onBackClick() {
        if (title.trim() === '' && value.title === '') {
            onDelete();
        } else {
            close();
        }
    }

    function onArchiveToggle() {
        let newVisibility;
        if (value.visibility === 'archived'){
            newVisibility = 'normal';
        } else if (value.visibility === 'trashed'){
            newVisibility = 'normal';
        } else {
            newVisibility = 'archived';
        }
        onChange?.({
            ...value,
            visibility: newVisibility,
        });
        if (newVisibility === 'archived'){
            onBack();
        }
        close();
    }

    switch (value.visibility) {
    case 'archived':
        archiveIcon = 'unarchive';
        archiveText = 'Desarchivar';
        deleteText = 'Eliminar';
        break;
    case 'trashed':
        archiveIcon = 'restore_from_trash';
        archiveText = 'Restaurar';
        deleteText = 'Eliminar permanentemente';
        break;
    default:
        archiveIcon = 'archive';
        archiveText = 'Archivar';
        deleteText = 'Eliminar';
    }

    function onDeleteClick(){
        setConfirmationVisible(true);
    }

    function onDeleteToggle() {
        if (value.visibility === 'trashed'){
            onDelete();
        } else{
            if (value.title === '') {
                onDelete();
            } else {
                onChange?.({
                    ...value,
                    visibility: 'trashed',
                });
                onBack();
            }
        }
    }

    return (
        <>
            <BlurredOverlay visible={!closed}>
                <div className='sizeLimitter'>
                    <ExpandedCard
                        className = 'component-GroupEditor-Popup'
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
                                {editorTitle}
                            </div>
                            <Attribute>
                                <Attribute.Title
                                    title='Nombre del grupo'
                                />
                                <Attribute.Middle>
                                    <TextField
                                        value= {title}
                                        onChange={value => setTitle(value)}
                                        placeholder= 'Vacío'
                                        variant= 'resizable'
                                    />
                                </Attribute.Middle>
                            </Attribute>
                            {error && (<div className='errorMessage'>{error}</div>)}
                            <Attribute>
                                <Attribute.Title
                                    title='Dentro de'
                                />
                                <Attribute.Middle>
                                    <select
                                        value= {parent}
                                        onChange= {event => setParent(event.target.value)}
                                        style={{
                                            fontFamily: 'inherit',
                                            fontSize: 'inherit',
                                            background: 'rgba(239, 239, 239, 0.32)',
                                            border: '0.03rem solid rgba(112, 112, 112, 0.5)',
                                            borderRadius: '0.75rem',
                                            minWidth: '8.1rem',
                                            padding: '0.25rem',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <option
                                            value=''
                                        >
                                    Inicio
                                        </option>
                                        {
                                            groupsList.map(group => (
                                                <option
                                                    key={group.id}
                                                    value={group.id}
                                                >
                                                    {group.label}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </Attribute.Middle>
                            </Attribute>
                            <Attribute>
                                <Attribute.Title
                                    title='Color'
                                />
                                <Attribute.Middle>
                                    <input
                                        type='color'
                                        style={{
                                            border: '0.03rem solid rgba(112, 112, 112, 0.5)',
                                            borderRadius: '0.75rem',
                                            padding: '0.2rem',
                                            width: '2rem',
                                            height: '2rem',
                                        }}
                                        value={color}
                                        onChange={event => setColor(event.target.value)}
                                    />
                                </Attribute.Middle>
                            </Attribute>
                            <Attribute>
                                <Attribute.Title
                                    title='Fecha límite'
                                />
                                <Attribute.Middle>
                                    <input type='datetime-local'
                                        value={deadline}
                                        onChange={event => setDeadline(event.target.value)}
                                        style={{
                                            fontFamily: 'inherit',
                                            fontSize: 'inherit',
                                            background: 'rgba(239, 239, 239, 0.32)',
                                            border: '0.03rem solid rgba(112, 112, 112, 0.5)',
                                            borderRadius: '0.75rem',
                                            padding: '0.25rem',
                                            textAlign: 'center',
                                            minWidth: 'min(9.6rem, 32vw)',
                                            maxWidth: 'min(9.6rem, 32vw)',
                                        }}/>
                                </Attribute.Middle>
                                {deadline !== '' && (
                                    <Attribute.Right onClick={() => setDeadline('')}>
                                        <button
                                            style={{
                                                border: 0,
                                                background: 0,
                                            }}
                                        >
                                            <Icon
                                                name={'cancel'}
                                            />
                                        </button>
                                    </Attribute.Right>
                                )}
                            </Attribute>
                        </ExpandedCard.Body>
                        <ExpandedCard.Bottom>
                            {value.title !== '' && (
                                <Button
                                    icon= {archiveIcon}
                                    text= {archiveText}
                                    onClick={onArchiveToggle}
                                />
                            )}
                            <Button
                                textColor='#ff3b30'
                                icon= 'delete'
                                text= {deleteText}
                                onClick={onDeleteClick}
                            />
                        </ExpandedCard.Bottom>
                    </ExpandedCard>
                </div>
            </BlurredOverlay>
            <DeleteConfirmation
                visible={confirmationVisible}
                variant={(value.visibility === 'trashed' ? 'permanentDelete' : 'toTrash')}
                onConfirm={onDeleteToggle}
                onCancel={()=>setConfirmationVisible(false)}
            />
        </>
    );
}

GroupEditor.propTypes = {
    /**
    * Grupo editado.
    */
    value: PropTypes.object.isRequired,
    /**
    * Evento llamado al hacer cancelar la acción.
    */
    onBack: PropTypes.func,
    /**
    * Evento llamado al cerrar el editor.
    */
    onCloseEditor: PropTypes.func,
    /**
    * Evento llamado al eliminar el grupo.
    */
    onDelete: PropTypes.func,
    /**
    * Evento llamado al modificar el grupo.
    */
    onChange: PropTypes.func,
    /**
    * Lista de grupos general.
    */
    groupsList: PropTypes.array,
};

GroupEditor.defaultProps = {
    onBack: undefined,
    onCloseEditor: undefined,
    onDelete: undefined,
    onChange: undefined,
    groupsList: [],
};

function dateConversion(value) {
    const date = value?.toDate?.() ?? value;
    if (!date) {
        return '';
    }
    const diff = -date.getTimezoneOffset();
    const offsetDate = new Date(date.getTime() + diff * 60000);
    const iso = offsetDate.toISOString();
    return iso.slice(0, -8);
}
