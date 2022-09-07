import React from 'react';
import { ComposedFAB } from '../../components/FAB';
import PropTypes from 'prop-types';
import Icon from '../../components/Icon';
import NavBar from '../../components/NavBar';
import TopBar from '../../components/TopBar';
import ItemController from '../../controllers/ItemController';
import Button from '../../components/Button';
import './style.css';
import Card from '../../components/Card';

/**
* Página de inicio de la aplicación.
*/
export default function Home({onNewTask : onNewTaskEvent, onNewGroup : onNewGroupEvent, onNewNote : onNewNoteEvent, onNewBlock : onNewBlockEvent, items, todayItems, hasArchivedItems, onViewArchive, onViewProfile, onViewCalendar, onViewSearch, profilePicture}) {

    function onNewTask(event) {
        if (onNewTaskEvent) {
            event.stopPropagation();
            onNewTaskEvent();
        }
    }

    function onNewGroup(event) {
        if (onNewGroupEvent) {
            event.stopPropagation();
            onNewGroupEvent();
        }
    }

    function onNewNote(event) {
        if (onNewNoteEvent) {
            event.stopPropagation();
            onNewNoteEvent();
        }
    }

    function onNewBlock(event) {
        if (onNewBlockEvent) {
            event.stopPropagation();
            onNewBlockEvent();
        }
    }

    return (
        <div>
            <TopBar variant='onGlass'>
                <img
                    src='/banner0.png'
                    onClick={() => {
                        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                    }}
                    style={{
                        width: '10rem',
                        margin: '0.3rem auto 0 0.5rem',
                    }}
                />
                <TopBar.Right onClick={onViewSearch}>
                    <Icon name='search'/>
                </TopBar.Right>
                <TopBar.Right onClick={onViewProfile}>
                    <div
                        style={{
                            background: `no-repeat center/cover url(${profilePicture})`,
                            width: '1.5rem',
                            height: '1.5rem',
                            borderRadius: '50%',
                            border: '0.06rem solid rgba(112, 112, 112, 0.5)',
                            display: 'inline-block',
                        }}
                    />
                </TopBar.Right>
            </TopBar>
            <Card
                variant='glass'
            >
                <div style={{
                    margin: '1.5rem 1.5rem 1rem 1.5rem',
                    textAlign: 'Left',
                    opacity: '0.5',
                    fontWeight: '300',
                }}>
                    {formatDayDate(Date.now())}
                </div>
                <Card.Body>
                    {(todayItems.length === 0) ? (
                        <div style={{
                            margin: '1rem 0',
                            textAlign: 'center',
                            opacity: '0.5',
                            fontWeight: '300',
                        }}>
                        No tienes nada programado para hoy.
                        </div>
                    ) : (
                        todayItems?.map?.(item => (
                            <ItemController
                                key={item.id}
                                id = {item.id}
                            />
                        ))
                    )}
                </Card.Body>
            </Card>
            {(items?.length === 0) && (
                <div className='emptyHomeMessage'>
                    <br/>
                    ¡Bienvenido!<br/><br/>
                    Puedes comenzar creando nuevas tareas, notas o grupos pulsando el botón &apos;+&apos;.
                    <br/><br/>

                </div>
            )}
            {items?.map?.(id => (
                <ItemController
                    key={id}
                    id = {id}
                />
            ))}
            {hasArchivedItems && (
                <Button
                    icon= {'inventory_2'}
                    text= {'Ver elementos archivados'}
                    variant= {'viewSection'}
                    onClick= {onViewArchive}
                />
            )}
            <ComposedFAB
                icon= 'add'
                color= '#65C582'
                offset={4}
                actions = {[
                    {
                        icon: 'folder',
                        text: 'Grupo',
                        onClick: onNewGroup,
                    },{
                        icon: 'event',
                        text: 'Evento',
                        onClick: onNewBlock,
                    },{
                        icon: 'sticky_note_2',
                        text: 'Nota',
                        onClick: onNewNote,
                    },{
                        icon: 'check_box',
                        text: 'Tarea',
                        onClick: onNewTask,
                    }
                ]}
            />

            <NavBar>
                <NavBar.Tab
                    icon = 'home'
                    name = 'Inicio'
                    active
                    onClick={() => {
                        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                    }}
                />
                <NavBar.Tab
                    icon = 'calendar_today'
                    name = 'Calendario'
                    onClick={onViewCalendar}
                />
            </NavBar>
        </div>
    );
}

Home.propTypes = {
    /**
    * Evento llamado al crear una nota.
    */
    onNewTask: PropTypes.func,
    /**
    * Evento llamado al crear un grupo.
    */
    onNewGroup: PropTypes.func,
    /**
    * Evento llamado al crear una anotación.
    */
    onNewNote: PropTypes.func,
    /**
    * Evento llamado al crear un bloque de calendario.
    */
    onNewBlock: PropTypes.func,
    /**
    * Contenido de la pantalla.
    */
    items: PropTypes.array,
    /**
    * Lista de elementos programados para hoy.
    */
    todayItems: PropTypes.array,
    /**
    * ¿Tiene elementos archivados?
    */
    hasArchivedItems: PropTypes.bool,
    /**
    * Evento llamado al ver el archivo.
    */
    onViewArchive: PropTypes.func,
    /**
    * Evento llamado al ver el perfil.
    */
    onViewProfile: PropTypes.func,
    /**
    * Evento llamado al ver el calendario.
    */
    onViewCalendar: PropTypes.func,
    /**
    * Evento llamado al ver la pantalla de búsqueda.
    */
    onViewSearch: PropTypes.func,
    /**
    * Evento llamado al ver la foto de perfil.
    */
    profilePicture: PropTypes.string,
};

Home.defaultProps = {
    onNewTask: undefined,
    onNewGroup: undefined,
    onNewNote: undefined,
    onNewBlock: undefined,
    items: undefined,
    todayItems: undefined,
    hasArchivedItems: false,
    onViewArchive: undefined,
    onViewProfile: undefined,
    onViewCalendar: undefined,
    onViewSearch: undefined,
    profilePicture: undefined,
};

/**
* Dar formato a la fecha.
*/
function formatDayDate(timestamp) {
    const months = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
    ];
    if (timestamp === Infinity) {
        return '';
    }
    const today = new Date(Date.now());
    const date = new Date(timestamp);
    if (today.getFullYear() === date.getFullYear()) {
        if (today.getMonth() === date.getMonth() && today.getDate() === date.getDate()) {
            return 'Hoy, ' + date.getDate() + ' de ' + months[date.getMonth()] + ' de ' + date.getFullYear() + ' ';
        }
        if (today.getMonth() === date.getMonth() && today.getDate() + 1 === date.getDate()) {
            return 'Mañana, ' + date.getDate() + ' de ' + months[date.getMonth()] + ' de ' + date.getFullYear() + ' ';
        }
    }
    return date.getDate() + ' de ' + months[date.getMonth()] + ' de ' + date.getFullYear() + ' ';
}
