import React, { useState } from 'react';
import { ComposedFAB } from '../../components/FAB';
import PropTypes from 'prop-types';
import Icon from '../../components/Icon';
import TopBar from '../../components/TopBar';
import ItemController from '../../controllers/ItemController';
import GroupEditor from '../../components/GroupEditor';
import Button from '../../components/Button';
import './style.css';
import StatsViewer from '../../components/StatsViewer';


/**
* Pantalla detalle de grupo.
*/
export default function GroupDetail({value, subItems, hasArchivedItems, onBack, groupsList, onNewTask : onNewTaskEvent, onNewGroup : onNewGroupEvent, onNewNote : onNewNoteEvent, onNewBlock : onNewBlockEvent, onChange, onDelete, onViewArchive, stats}) {
    let pinIconFill;
    const listItems = [];
    const [editorVisible, setEditorVisible] = useState(false);
    const [statsVisible, setStatsVisible] = useState(false);

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

    function onEditGroup() {
        setEditorVisible(true);
    }

    function onViewStats() {
        setStatsVisible(true);
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

    function onGroupChangeDone(newValue) {
        onChange?.(newValue);
    }

    function onDeleteClick() {
        onDelete?.();
    }

    if (value.visibility === 'pinned'){
        pinIconFill = true;
    } else {
        pinIconFill = false;
    }

    if (value.children !== undefined && value.children.length !== 0) {
        for (const child of subItems) {
            listItems.push(
                <ItemController
                    id = {child.id}
                    key = {child.id}
                />
            );
        }
    }

    return (
        <div className='component-groupDetail'>
            <TopBar variant='onGlass'>
                <TopBar.Left onClick = {onBack}>
                    <Icon name='arrow_back_ios'/>
                </TopBar.Left>
                <Icon
                    name='circle'
                    fill={true}
                    size={2}
                    color={value.color}
                />
                <TopBar.Title
                    title={value.title}
                />
                <TopBar.Right onClick = {onEditGroup}>
                    <Icon name='edit'/>
                </TopBar.Right>
                {((value.children !== undefined && value.children.length !== 0) || hasArchivedItems) && (
                    <TopBar.Right onClick = {onViewStats}>
                        <Icon name='insert_chart'/>
                    </TopBar.Right>
                )}
                <TopBar.Right onClick = {onPinToggle}>
                    <Icon
                        name='bookmark'
                        fill={pinIconFill}
                        color={value.visibility === 'pinned' ? value.color : undefined}
                    />
                </TopBar.Right>
            </TopBar>
            {(value.children === undefined || value.children.length === 0) && (
                <div className='emptyGroupMessage'>
                    <br/>
                    ¡Nada por aquí!<br/><br/>
                    Para crear nuevas tareas, notas o grupos pulsa el botón &apos;+&apos;.
                    <br/><br/>

                </div>
            )}
            {listItems}
            {hasArchivedItems && (
                <Button
                    icon= {'inventory_2'}
                    text= {'Ver elementos archivados'}
                    variant= {'viewSection'}
                    onClick={onViewArchive}
                />
            )}
            <ComposedFAB
                icon= 'add'
                color= '#65C582'
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
            {(editorVisible || value.title === '') && (
                <GroupEditor
                    value={value}
                    onChange={onGroupChangeDone}
                    onCloseEditor={() => setEditorVisible(false)}
                    onBack={onBack}
                    groupsList={groupsList}
                    onDelete={onDeleteClick}
                />
            )}
            {(statsVisible) && (
                <StatsViewer
                    value={stats}
                    onCloseStats={() => setStatsVisible(false)}
                />
            )}
        </div>
    );
}

GroupDetail.propTypes = {
    /**
    * Contenido del grupo.
    */
    value: PropTypes.object.isRequired,
    /**
    * Elementos contenidos por el grupo.
    */
    subItems: PropTypes.array,
    /**
    * ¿Tiene elementos archivados?
    */
    hasArchivedItems: PropTypes.bool,
    /**
    * Lista general de grupos.
    */
    groupsList: PropTypes.array,
    /**
    * Evento llamado al hacer crear una tarea.
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
    * Evento llamado al volver a la pantalla anterior.
    */
    onBack: PropTypes.func,
    /**
    * Evento llamado al modificar un grupo.
    */
    onChange: PropTypes.func,
    /**
    * Evento llamado al eliminar un grupo.
    */
    onDelete: PropTypes.func,
    /**
    * Evento llamado al archivar un grupo.
    */
    onViewArchive: PropTypes.func,
    /**
    * Datos de estadísticas del grupo.
    */
    stats: PropTypes.object,
};

GroupDetail.defaultProps = {
    groupsList: undefined,
    hasArchivedItems:false,
    subItems: [],
    onNewTask: undefined,
    onNewGroup: undefined,
    onNewNote: undefined,
    onNewBlock: undefined,
    onBack: undefined,
    onChange: undefined,
    onDelete: undefined,
    onViewArchive: undefined,
    stats: undefined,
};
