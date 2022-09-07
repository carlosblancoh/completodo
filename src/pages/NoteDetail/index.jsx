import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Attribute from '../../components/Attribute';
import Button from '../../components/Button';
import ExpandedCard from '../../components/ExpandedCard';
import Icon from '../../components/Icon';
import TopBar from '../../components/TopBar';
import TextField from '../../components/TextField';
import DeleteConfirmation from '../../components/DeleteConfirmation';
import './style.css';

/**
* Página detalle de nota.
*/
export default function NoteDetail({value, onBack, onChange, parent, parentColor, groupsList, onDelete}) {
    const nameOfParent = parent?.title ?? 'Inicio';
    const parentDeadline = parent?.deadline ?? null;
    const parentGroupColor = parentColor;
    const [confirmationVisible, setConfirmationVisible] = useState(false);

    let pinIconFill;
    let archiveIcon;
    let archiveText;
    let deleteText;

    function onTitleOrTextChange({title, subtitle}) {
        onChange?.({
            ...value,
            title : title,
            text : subtitle,
        });
    }

    function onLocationChange(location) {
        onChange?.({
            ...value,
            location : location,
        });
    }

    function onPriorityChange(event) {
        onChange?.({
            ...value,
            priority : parseInt(event.target.value),
        });
    }

    function onGroupChange(event) {
        onChange?.({
            ...value,
            parent: (event.target.value === '') ? null : event.target.value,
            group: (event.target.value === '') ? null : event.target.value,
        });
    }

    function onScheduledDateChange(event) {
        let newValue;
        if (event.target.value !== '') {
            newValue = new Date(event.target.value);
        } else {
            newValue = null;
        }
        onChange?.({
            ...value,
            scheduledDate : newValue,
        });
    }

    function onScheduledDateClear() {
        onChange?.({
            ...value,
            scheduledDate : null,
        });
    }

    function onPinToggle() {
        let newVisibility;
        if (value.visibility === 'pinned'){
            newVisibility = 'normal';
        } else{
            newVisibility = 'pinned';
        }
        onChange?.({
            ...value,
            visibility: newVisibility,
        });
    }

    if (value.visibility === 'pinned'){
        pinIconFill = true;
    } else {
        pinIconFill = false;
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
            onChange?.({
                ...value,
                visibility: 'trashed',
            });
            onBack();
        }
    }

    return (
        <div className='fullPage'>
            <ExpandedCard
                variant = 'plain'
            >
                <ExpandedCard.Top>
                    <TopBar variant='noBackground'>
                        <TopBar.Left onClick = {onBack}>
                            <Icon name='arrow_back_ios'/>
                        </TopBar.Left>
                        <Icon
                            name='circle'
                            fill={true}
                            size={1}
                            color= {parentGroupColor}
                        />
                        <TopBar.Title
                            title={nameOfParent}
                            back
                        />
                        <TopBar.Right onClick = {onPinToggle}>
                            <Icon
                                name='bookmark'
                                fill={pinIconFill}
                                color={value.visibility === 'pinned' ? parentGroupColor : undefined}
                            />
                        </TopBar.Right>
                    </TopBar>
                </ExpandedCard.Top>
                <ExpandedCard.Header>
                    <ExpandedCard.Header.Title
                        title= {value.title}
                        subtitle={value.text}
                        onChange={onTitleOrTextChange}
                    />
                </ExpandedCard.Header>
                <ExpandedCard.Body>
                    <Attribute>
                        <Attribute.Title
                            title='Localización'
                        />
                        <Attribute.Middle>
                            <TextField
                                value= {value.location}
                                placeholder= 'Ninguna'
                                variant= 'resizable'
                                onChange= {onLocationChange}
                            />
                        </Attribute.Middle>
                    </Attribute>
                    <Attribute>
                        <Attribute.Title
                            title='Prioridad'
                        />
                        <Attribute.Middle>
                            <select
                                value= {value.priority}
                                onChange= {onPriorityChange}
                                style={{
                                    fontFamily: 'inherit',
                                    fontSize: 'inherit',
                                    background: 'rgba(239, 239, 239, 0.32)',
                                    border: '0.03rem solid rgba(112, 112, 112, 0.5)',
                                    borderRadius: '0.75rem',
                                    minWidth: '8.1rem',
                                    padding: '0.25rem',
                                    textAlign: 'center',
                                }}
                            >
                                <option value='2'>Muy alta ⏫</option>
                                <option value='1'>Alta 🔼</option>
                                <option value='0'>Normal</option>
                                <option value='-1'>Baja 🔽</option>
                            </select>
                        </Attribute.Middle>
                    </Attribute>
                    <Attribute>
                        <Attribute.Title
                            title='Fecha programada'
                        />
                        <Attribute.Middle>
                            <input
                                type='datetime-local'
                                value= {dateConversion(value.scheduledDate)}
                                max= {dateConversion(parentDeadline)}
                                onChange= {onScheduledDateChange}
                                style={{
                                    fontFamily: 'inherit',
                                    fontSize: 'inherit',
                                    background: 'rgba(239, 239, 239, 0.32)',
                                    border: '0.03rem solid rgba(112, 112, 112, 0.5)',
                                    borderRadius: '0.75rem',
                                    padding: '0.25rem',
                                    textAlign: 'center',
                                    minWidth: 'min(9.6rem, 35vw)',
                                    maxWidth: 'min(9.6rem, 35vw)',
                                }}/>
                        </Attribute.Middle>
                        {value.scheduledDate !== null && (
                            <Attribute.Right onClick={onScheduledDateClear}>
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
                    <Attribute>
                        <Attribute.Title
                            title='Grupo'
                        />
                        <Attribute.Middle>
                            <select
                                value= {value.parent ?? ''}
                                onChange= {onGroupChange}
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
                                    Sin grupo asignado
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
                </ExpandedCard.Body>
                <ExpandedCard.Bottom>
                    <Attribute>
                        <div style={{
                            fontFamily: 'inherit',
                            fontSize: '0.9rem',
                            fontWeight: '300',
                            opacity: '0.5',
                            textAlign: 'center',
                            flexGrow: '1',
                        }}>
                            Fecha de creación: {value.creationDate.toDate().toLocaleDateString('es-ES', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
                        </div>
                    </Attribute>
                    <Button
                        icon= {archiveIcon}
                        text= {archiveText}
                        onClick={onArchiveToggle}
                    />
                    <Button
                        textColor='#ff3b30'
                        icon= 'delete'
                        text= {deleteText}
                        onClick={onDeleteClick}
                    />
                </ExpandedCard.Bottom>
            </ExpandedCard>
            <DeleteConfirmation
                visible={confirmationVisible}
                variant={(value.visibility === 'trashed' ? 'permanentDelete' : 'toTrash')}
                onConfirm={onDeleteToggle}
                onCancel={()=>setConfirmationVisible(false)}
            />
        </div>

    );
}

NoteDetail.propTypes = {
    /**
    * Contenido de la nota.
    */
    value: PropTypes.object.isRequired,
    /**
    * Evento llamado al volver a la página anterior.
    */
    onBack: PropTypes.func,
    /**
    * Evento llamado al modificar la nota.
    */
    onChange: PropTypes.func,
    /**
    * Grupo al que pertenece la nota.
    */
    parent: PropTypes.object,
    /**
    * Color del grupo al que pertenece la nota.
    */
    parentColor: PropTypes.string,
    /**
    * Evento llamado al modificar la localización de la nota.
    */
    onLocationChage: PropTypes.func,
    /**
    * Lista general de grupos.
    */
    groupsList: PropTypes.array,
    /**
    * Evento llamado al eliminar la nota.
    */
    onDelete: PropTypes.func,
};

NoteDetail.defaultProps = {
    onBack: undefined,
    onChange: undefined,
    parent: undefined,
    parentColor: undefined,
    onLocationChage: undefined,
    groupsList: [],
    onDelete: undefined,
};


/**
* Convertir la fecha de Date al formato de firebase.
*/
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
