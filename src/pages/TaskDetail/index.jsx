import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';
import Attribute from '../../components/Attribute';
import Button from '../../components/Button';
import Card from '../../components/Card';
import ExpandedCard from '../../components/ExpandedCard';
import Icon from '../../components/Icon';
import TopBar from '../../components/TopBar';
import TaskController from '../../controllers/TaskController';
import TextField from '../../components/TextField';
import usePrevious from '../../hooks/previous';
import DeleteConfirmation from '../../components/DeleteConfirmation';
import './style.css';
import { useRef } from 'react';
import Timer from '../../components/Timer';


export default function TaskDetail({id, value, subItems, hasArchivedItems, onCompleted, onUncompleted, _onClick, onBack, onChange, parent, parentColor, groupsList, onNewTask : onNewTaskEvent, onDelete, onViewArchive, onTimerPlay, onTimerPause}) {
    const listTasks = [];
    const wasCompleted = usePrevious(value.completed);
    const nameOfParent = parent?.title ?? 'Inicio';
    const parentDeadline = parent?.deadline ?? null;
    const parentGroupColor = parentColor;
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const ref = useRef(null);

    useEffect(()=>{
        ref.current.style.animation = 'none';
        ref.current.offsetHeight;
        ref.current.style.animation = null;
    }, [id]);

    let pinIconFill;
    let archiveIcon;
    let archiveText;
    let deleteText;


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
        colors: [(parent?.color ?? '#65c582')]
        //colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
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

    function onPriorityChange(event) {
        onChange?.({
            ...value,
            priority : parseInt(event.target.value),
        });
    }

    function onDifficultyChange(event) {
        onChange?.({
            ...value,
            difficulty : parseInt(event.target.value),
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
            scheduledDate : newValue,
        });
    }

    function onScheduledDateClear() {
        onChange?.({
            ...value,
            scheduledDate : null,
        });
    }

    function onDeadlineChange(event) {
        let newValue;
        if (event.target.value !== '') {
            newValue = new Date(event.target.value);
        } else {
            newValue = null;
        }
        onChange?.({
            ...value,
            deadline : newValue,
        });
    }

    function onDeadlineClear() {
        onChange?.({
            ...value,
            deadline : null,
        });
    }

    function onDurationToggle() {
        onChange?.({
            ...value,
            hasDuration : !value.hasDuration,
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

    function onNewTask(event) {
        if (onNewTaskEvent) {
            event.stopPropagation();
            onNewTaskEvent();
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
            setConfirmationVisible(false);
            onDelete();
        } else{
            onChange?.({
                ...value,
                visibility: 'trashed',
            });
            setConfirmationVisible(false);
            onBack();
        }
    }

    if (value.children !== undefined && value.children.length !== 0) {
        for (const child of subItems) {
            listTasks.push(
                <TaskController
                    id = {child.id}
                    key = {child.id}
                />
            );
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
                    <ExpandedCard.Header.Left
                        onClick={onCheckBoxClick}>
                        <Confetti
                            active={wasCompleted !== value.completed && value.completed}
                            config={config}
                            className='confetti'
                        />
                        <Icon name={(value.completed ? 'check_box' : 'check_box_outline_blank')}/>
                    </ExpandedCard.Header.Left>
                    <ExpandedCard.Header.Title
                        title= {value.title}
                        subtitle={value.text}
                        onChange={onTitleOrTextChange}
                    />
                    {value.hasDuration && (
                        <Card.Header.Right onClick={() => {}}>
                            <Timer
                                value={value.duration}
                                start={value.timerStartTime?.toDate?.()}
                                paused={value.isPaused}
                                onPlay={onTimerPlay}
                                onPause={onTimerPause}
                            />
                        </Card.Header.Right>
                    )}
                </ExpandedCard.Header>
                <ExpandedCard.Body>
                    {listTasks}
                    {value.type === 'task' && (
                        <Card
                            variant='plain'
                            stackable
                            onClick={onNewTask}
                        >
                            <Card.Middle>
                                <Icon name='add'/>
                            </Card.Middle>
                        </Card>
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
                            title='Dificultad'
                        />
                        <Attribute.Middle>
                            <select
                                value= {value.difficulty}
                                onChange= {onDifficultyChange}
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
                                <option value='2'>Muy difícil 😰</option>
                                <option value='1'>Difícil 😥</option>
                                <option value='0'>Normal</option>
                                <option value='-1'>Fácil 🥱</option>
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
                                max= {dateConversion(value.deadline)}
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
                            title='Fecha límite'
                        />
                        <Attribute.Middle>
                            <input type='datetime-local'
                                value= {dateConversion(value.deadline)}
                                max= {dateConversion(parentDeadline)}
                                onChange= {onDeadlineChange}
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
                        {value.deadline !== null && (
                            <Attribute.Right onClick={onDeadlineClear}>
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
                            title='Activar temporizador'
                        />
                        <Attribute.Middle>
                            <div style={{
                                fontFamily: 'inherit',
                                fontSize: 'inherit',
                                padding: '0.2rem',
                                opacity: (value.hasDuration ? '1' : '0'),
                            }}>
                                {durationWithSecondsConversion(value.duration)}
                            </div>
                        </Attribute.Middle>
                        <Attribute.Right onClick = {onDurationToggle}>
                            <Icon name={(value.hasDuration ? 'check_box' : 'check_box_outline_blank')}/>
                        </Attribute.Right>
                    </Attribute>
                    {value.type !== 'subtask' && (
                        <>
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
                            {hasArchivedItems && (
                                <Button
                                    icon= {'inventory_2'}
                                    text= {'Ver elementos archivados'}
                                    variant= {'viewSection'}
                                    onClick= {onViewArchive}
                                />
                            )}
                        </>
                    )}
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

TaskDetail.propTypes = {
    id: PropTypes.string,
    value: PropTypes.object.isRequired,
    subItems: PropTypes.array,
    hasArchivedItems: PropTypes.bool,
    onCompleted: PropTypes.func,
    onUncompleted: PropTypes.func,
    _onClick: PropTypes.func,
    onBack: PropTypes.func,
    onChange: PropTypes.func,
    parent: PropTypes.object,
    parentColor: PropTypes.string,
    onLocationChage: PropTypes.func,
    groupsList: PropTypes.array,
    onNewTask: PropTypes.func,
    onDelete: PropTypes.func,
    onViewArchive: PropTypes.func,
    onTimerPlay: PropTypes.func,
    onTimerPause: PropTypes.func,
};

TaskDetail.defaultProps = {
    id: undefined,
    subItems: [],
    hasArchivedItems: false,
    onCompleted: undefined,
    onUncompleted: undefined,
    _onClick: undefined,
    onBack: undefined,
    onChange: undefined,
    parent: undefined,
    parentColor: undefined,
    onLocationChage: undefined,
    groupsList: [],
    onNewTask: undefined,
    onDelete: undefined,
    onViewArchive: undefined,
    onTimerPlay: undefined,
    onTimerPause: undefined,
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

function durationWithSecondsConversion(value) {
    const duration = value;
    if (!duration) {
        return '';
    }
    return ((Math.floor(duration/3600)).toString().padStart(2, '0') + ':' + (Math.floor((duration%3600)/60)).toString().padStart(2, '0') + ':' + (Math.floor(duration%60)).toString().padStart(2, '0'));
}
