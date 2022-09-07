import React from 'react';
import { ComposedFAB } from '../../components/FAB';
import PropTypes from 'prop-types';
import Icon from '../../components/Icon';
import NavBar from '../../components/NavBar';
import TopBar from '../../components/TopBar';
import CalendarComponent from '../../components/CalendarComponent';
import './style.css';
import ItemController from '../../controllers/ItemController';
import Card from '../../components/Card';

/**
* Pantalla de calendario.
*/
export default function Calendar({onNewTask : onNewTaskEvent, onNewGroup : onNewGroupEvent, onNewNote : onNewNoteEvent, onNewBlock : onNewBlockEvent, onViewProfile, onViewHome, onViewSearch, profilePicture, blocks, onDayClick, items, selectedDayString}) {

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
                    onClick = {onViewHome}
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
            <CalendarComponent
                blocks = {blocks}
                onClick = {onDayClick}
            >
            </CalendarComponent>
            <Card
                variant='glass'
            >
                <div style={{
                    margin: '1.5rem 1.5rem 1rem 1.5rem',
                    textAlign: 'Left',
                    opacity: '0.5',
                    fontWeight: '300',
                }}>
                    {selectedDayString}
                </div>
                <Card.Body>
                    {(items.length === 0) ? (
                        <div style={{
                            margin: '1rem 0',
                            textAlign: 'center',
                            opacity: '0.5',
                            fontWeight: '300',
                        }}>
                        No tienes nada programado para hoy.
                        </div>
                    ) : (
                        items?.map?.(item => (
                            <ItemController
                                key={item.id}
                                id = {item.id}
                            />
                        ))
                    )}
                </Card.Body>
            </Card>
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
                    onClick = {onViewHome}
                />
                <NavBar.Tab
                    icon = 'calendar_today'
                    name = 'Calendario'
                    active
                    onClick={() => {
                        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                    }}
                />
            </NavBar>
        </div>
    );
}

Calendar.propTypes = {
    /**
    * Evento llamado al crear una tarea.
    */
    onNewTask: PropTypes.func,
    /**
    * Evento llamado al crear un grupo.
    */
    onNewGroup: PropTypes.func,
    /**
    * Evento llamado al crear una nota.
    */
    onNewNote: PropTypes.func,
    /**
    * Evento llamado al crear un bloque de calendario.
    */
    onNewBlock: PropTypes.func,
    /**
    * Evento llamado al navegar al perfil.
    */
    onViewProfile: PropTypes.func,
    /**
    * Evento llamado al navegar a inicio.
    */
    onViewHome: PropTypes.func,
    /**
    * Evento llamado al navegar a buscar.
    */
    onViewSearch: PropTypes.func,
    /**
    * Imagen de perfil del usuario.
    */
    profilePicture: PropTypes.string,
    /**
    * Lista de eventos o bloques de tiempo a mostrar.
    */
    blocks: PropTypes.array,
    /**
    * Evento llamado al hacer click en un día.
    */
    onDayClick: PropTypes.func,
    /**
    * Lista de elementos programados para el día.
    */
    items: PropTypes.array,
    /**
    * Día seleccionado.
    */
    selectedDayString: PropTypes.string,
};

Calendar.defaultProps = {
    onNewTask: undefined,
    onNewGroup: undefined,
    onNewNote: undefined,
    onNewBlock: undefined,
    onViewProfile: undefined,
    onViewHome: undefined,
    onViewSearch: undefined,
    profilePicture: undefined,
    blocks: undefined,
    onDayClick: undefined,
    items: undefined,
    selectedDayString: undefined,
};
