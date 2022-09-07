import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';
import Attribute from '../../components/Attribute';
import Button from '../../components/Button';
import ExpandedCard from '../../components/ExpandedCard';
import Icon from '../../components/Icon';
import TopBar from '../../components/TopBar';
import TextField from '../../components/TextField';
import usePrevious from '../../hooks/previous';
import DeleteConfirmation from '../../components/DeleteConfirmation';
import './style.css';
import { useRef } from 'react';


/**
* Pantalla detalle de evento o bloque de tiempo
*/
export default function BlockDetail({id, value, onCompleted, onUncompleted, onBack, onChange, group, groupsList, onDelete}) {
    const wasCompleted = usePrevious(value.completed);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const ref = useRef(null);
    let deleteText = 'Eliminar permanentemente';

    useEffect(()=>{
        ref.current.style.animation = 'none';
        ref.current.offsetHeight;
        ref.current.style.animation = null;
    }, [id]);

    function onCheckBoxClick() {
        if (value.completed) {
            onUncompleted?.();
        } else {
            onCompleted?.();
        }
    }
    /**
     * Configuración del efecto al completar tarea
     * https://daniel-lundin.github.io/react-dom-confetti/
     */
    const config = {
        angle: 90,
        spread: 360,
        startVelocity: 20,
        elementCount: 70,
        dragFriction: 0.12,
        duration: 3000,
        stagger: 3,
        width: '10px',
        height: '10px',
        perspective: '500px',
        //colors: [(color ?? '#65c582')]
        //colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
        colors: ['#65C582', '#707070', '#fcfcfc', '#000000']
    };

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

    function onGroupChange(event) {
        onChange?.({
            ...value,
            group: (event.target.value === '') ? null : event.target.value,
        });
    }

    function onDateChange(event) {
        let newValue;
        if (event.target.value !== '') {
            try {
                newValue = new Date(event.target.value);
            } catch (_) {
                newValue = null;
            }
        } else {
            newValue = null;
        }
        onChange?.({
            ...value,
            date : newValue,
        });
    }

    function onDurationChange(event) {
        let newValue;
        if (event.target.value !== '') {
            try {
                newValue = (event.target.valueAsNumber/1000);
            } catch (_) {
                newValue = null;
            }
        } else {
            newValue = null;
        }
        onChange?.({
            ...value,
            duration : newValue,
        });
    }

    function onBackClick() {
        if (value.date === null || value.title === '') {
            onDeleteClick();
        } else {
            onBack();
        }
    }

    function onDeleteClick() {
        setConfirmationVisible(true);
    }

    function onCompletableToggle() {
        onChange?.({
            ...value,
            completable : !value.completable,
        });
    }

    function onDeleteToggle() {
        onDelete();
    }

    function onColorChange(event) {
        onChange?.({
            ...value,
            color: event.target.value,
        });
    }

    return (
        <div className='fullPage' ref={ref}>
            <ExpandedCard
                variant = 'plain'
                color = {group?.color ?? value?.color ?? '#65C582'}
            >
                <ExpandedCard.Top>
                    <TopBar variant='noBackground'>
                        <TopBar.Left onClick = {onBackClick}>
                            <Icon name='arrow_back_ios'/>
                        </TopBar.Left>
                    </TopBar>
                </ExpandedCard.Top>
                <ExpandedCard.Header>
                    {value.completable ? (
                        <ExpandedCard.Header.Left
                            onClick={onCheckBoxClick}>
                            <Confetti
                                active={wasCompleted !== value.completed && value.completed}
                                config={config}
                                className='confetti'
                            />
                            <Icon name={(value.completed ? 'event_available' : 'calendar_today')}/>
                        </ExpandedCard.Header.Left>
                    ) : (
                        <ExpandedCard.Header.Left>
                            <Icon name='event'/>
                        </ExpandedCard.Header.Left>
                    )}
                    <ExpandedCard.Header.Title
                        title= {value.title}
                        subtitle={value.text}
                        onChange={onTitleOrTextChange}
                    />
                </ExpandedCard.Header>
                <ExpandedCard.Body>
                    {(value.title === '') && (
                        <div style={{
                            display: 'block',
                            margin: '0.5rem 1rem 0.5rem 1rem',
                            textAlign: 'center',
                            color: '#ff3b30',
                            border: '0.05rem solid rgba(112, 112, 112, 0.5)',
                            background: 'white',
                            borderRadius: '1rem',
                            padding: '1rem',
                            fontFamily: 'inherit',
                            maxWidth: 'none',
                            position: 'relative',
                        }}>
                            El evento de calendario tiene que tener un título obligatoriamente. El evento de calendario sin título será eliminado.
                        </div>
                    )}
                    <Attribute>
                        <Attribute.Title
                            title='Fecha y hora'
                        />
                        <Attribute.Middle>
                            <input
                                type='datetime-local'
                                value= {dateConversion(value.date)}
                                onChange= {onDateChange}
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
                                    color: 'inherit',
                                }}/>
                        </Attribute.Middle>
                    </Attribute>
                    {(value.date === null) && (
                        <div style={{
                            display: 'block',
                            margin: '0.5rem 1rem 0.5rem 1rem',
                            textAlign: 'center',
                            color: '#ff3b30',
                            border: '0.05rem solid rgba(112, 112, 112, 0.5)',
                            background: 'white',
                            borderRadius: '1rem',
                            padding: '1rem',
                            fontFamily: 'inherit',
                            maxWidth: 'none',
                            position: 'relative',
                        }}>
                            El evento de calendario tiene que tener una fecha obligatoriamente. El evento de calendario sin fecha será eliminado.
                        </div>
                    )}
                    <Attribute>
                        <Attribute.Title
                            title='Duración'
                        />
                        <Attribute.Middle>
                            <input
                                type='time'
                                value= {durationConversion(value.duration)}
                                onChange= {onDurationChange}
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
                                    color: 'inherit',
                                }}/>
                        </Attribute.Middle>
                    </Attribute>
                    <Attribute>
                        <Attribute.Title
                            title='Hacer tareas del grupo:'
                        />
                        <Attribute.Middle>
                            <select
                                value= {value.group ?? ''}
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
                                    color: 'inherit',
                                }}
                            >
                                <option
                                    style={{
                                        color: 'black'
                                    }}
                                    value=''
                                >
                                    Ninguno
                                </option>
                                {
                                    groupsList.map(group => (
                                        <option
                                            style={{
                                                color: 'black'
                                            }}
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
                    {(value.group === null) && (
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
                                    value={value?.color ?? '#65C582'}
                                    onChange={onColorChange}
                                />
                            </Attribute.Middle>
                        </Attribute>
                    )}
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
                            title='Completable'
                        />
                        <Attribute.Right onClick = {onCompletableToggle}>
                            <Icon name={(value.completable ? 'check_box' : 'check_box_outline_blank')}/>
                        </Attribute.Right>
                    </Attribute>
                </ExpandedCard.Body>
                <ExpandedCard.Bottom>
                    {(value.completionDate === null || value.completionDate === undefined) && (
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
                    )}

                    {(value.completionDate !== null && value.completionDate !== undefined) && (
                        <Attribute>
                            <div style={{
                                fontFamily: 'inherit',
                                fontSize: '0.9rem',
                                fontWeight: '300',
                                opacity: '0.5',
                                textAlign: 'center',
                                flexGrow: '1',
                            }}>

                            Completado: {value.completionDate.toDate().toLocaleDateString('es-ES', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
                            &nbsp;a las {value.completionDate.toDate().toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'})}
                                <br/><br/>
                            Fecha de creación: {value.creationDate.toDate().toLocaleDateString('es-ES', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
                            </div>
                        </Attribute>
                    )}
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
                variant={'deleteBlock'}
                onConfirm={onDeleteToggle}
                onCancel={()=>setConfirmationVisible(false)}
            />
        </div>

    );
}

BlockDetail.propTypes = {
    /**
    * Identificador del bloque de tiempo.
    */
    id: PropTypes.string,
    /**
    * Contenido del bloque de tiempo.
    */
    value: PropTypes.object.isRequired,
    /**
    * Evento llamado al hacer completar el bloque.
    */
    onCompleted: PropTypes.func,
    /**
    * Evento llamado al descompletar el bloque.
    */
    onUncompleted: PropTypes.func,
    /**
    * Evento llamado al volver a la pantalla anterior.
    */
    onBack: PropTypes.func,
    /**
    * Evento llamado al modificar el bloque.
    */
    onChange: PropTypes.func,
    /**
    * Grupo del que recuperar tareas.
    */
    group: PropTypes.object,
    /**
    * Evento llamado al cambiar la localización.
    */
    onLocationChage: PropTypes.func,
    /**
    * Lista general de grupos.
    */
    groupsList: PropTypes.array,
    /**
    * Evento llamado al eliminar el evento.
    */
    onDelete: PropTypes.func,
};

BlockDetail.defaultProps = {
    id: undefined,
    onCompleted: undefined,
    onUncompleted: undefined,
    onBack: undefined,
    onChange: undefined,
    group: undefined,
    onLocationChage: undefined,
    groupsList: [],
    onDelete: undefined,
};

/**
* Conversión de formato de fecha.
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

/**
* Conversión del formato de la duración.
*/
function durationConversion(value) {
    const duration = value;
    if (!duration) {
        return '';
    }
    return ((Math.floor(duration/3600)).toString().padStart(2, '0') + ':' + (Math.floor(duration%3600)/60).toString().padStart(2, '0'));
}
