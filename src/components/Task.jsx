import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Confetti from 'react-dom-confetti';
import Card from './Card';
import Icon from './Icon';
import TaskController from '../controllers/TaskController';
import usePrevious from '../hooks/previous';
import Timer from './Timer';

export default function Task({id, value, parent, onCompleted, onUncompleted, onClick, onChange, onTimerPlay, onTimerPause, stackable}) {
    const [expandedSubtasks, setExpandedSubtasks] = useState(false);
    const wasCompleted = usePrevious(value.completed);
    const closerDate = Math.min(value.scheduledDate?.toDate?.() ?? Infinity, value.deadline?.toDate?.() ?? Infinity);

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

    function onTitleChange({title}) {
        onChange?.({
            ...value,
            title: title,
        });
    }

    function onArrowClick() {
        setExpandedSubtasks(!expandedSubtasks);
    }

    const isStackable = stackable === true || (stackable === 'auto' && value.type === 'subtask');

    if (value.children !== undefined && value.children.length !== 0) {
        const listTasks = [];
        for (const child of value.children) {
            listTasks.push(
                <TaskController
                    id = {child}
                    key = {child}
                />
            );
        }
        return (
            <Card
                key={id}
                variant = 'plain'
                stackable = {isStackable}
                dimmed = {value.completed}
                pinned = {value.visibility === 'pinned' && (parent?.color ?? '#65c582')}
            >
                <Card.Header onClick = {onClick}>
                    <Card.Header.Left onClick={onCheckBoxClick}>
                        <Confetti
                            active={wasCompleted !== value.completed && value.completed}
                            config={config}
                            className='confetti'
                        />
                        <Icon name={(value.completed ? 'check_box' : 'check_box_outline_blank')}/>
                    </Card.Header.Left>
                    <Card.Header.Title
                        title={value.title}
                        subtitle={formatDate(closerDate) + formatPriority(value.priority) + formatDifficulty(value.difficulty)}
                        onChange={onTitleChange}
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
                    <Card.Header.Right onClick={onArrowClick}>
                        <span
                            style={{
                                transform: `rotate(${expandedSubtasks ? '180deg' : '0deg'}) translateY(${expandedSubtasks ? '0.3rem' : '0'})`,
                                transition: 'transform 0.5s',
                            }}
                        >
                            <Icon name='expand_more'/>
                        </span>
                    </Card.Header.Right>
                    {(value.visibility === 'archived') && (
                        <Card.Header.Right>
                            <div style={{
                                opacity: '0.3',
                            }}>
                                <Icon
                                    name='inventory_2'
                                />
                            </div>
                        </Card.Header.Right>
                    )}
                    {(value.visibility === 'trashed') && (
                        <Card.Header.Right>
                            <div style={{
                                opacity: '0.3',
                            }}>
                                <Icon
                                    name='delete'
                                />
                            </div>
                        </Card.Header.Right>
                    )}
                </Card.Header>
                <Card.Body collapsed={!expandedSubtasks}>
                    {listTasks}
                </Card.Body>
            </Card>
        );
    }
    return (
        <Card
            key={id}
            variant = 'plain'
            stackable = {isStackable}
            dimmed = {value.completed}
            pinned = {value.visibility === 'pinned' && (parent?.color ?? '#65c582')}
        >
            <Card.Header onClick = {onClick}>
                <Card.Header.Left onClick={onCheckBoxClick}>
                    <Confetti
                        active={wasCompleted !== value.completed && value.completed}
                        config={config}
                        className='confetti'
                    />
                    <Icon name={(value.completed ? 'check_box' : 'check_box_outline_blank')}/>
                </Card.Header.Left>
                <Card.Header.Title
                    title={value.title}
                    subtitle={formatDate(closerDate) + formatPriority(value.priority) + formatDifficulty(value.difficulty)}
                    onChange={onTitleChange}
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
                {(value.visibility === 'archived') && (
                    <Card.Header.Right>
                        <div style={{
                            opacity: '0.3',
                        }}>
                            <Icon
                                name='inventory_2'
                            />
                        </div>
                    </Card.Header.Right>
                )}
                {(value.visibility === 'trashed') && (
                    <Card.Header.Right>
                        <div style={{
                            opacity: '0.3',
                        }}>
                            <Icon
                                name='delete'
                            />
                        </div>
                    </Card.Header.Right>
                )}
            </Card.Header>
        </Card>
    );
}

Task.propTypes = {
    value: PropTypes.object.isRequired,
    id: PropTypes.string,
    parent: PropTypes.object,
    onCompleted: PropTypes.func,
    onUncompleted: PropTypes.func,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onTimerPlay: PropTypes.func,
    onTimerPause: PropTypes.func,
    stackable: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(['auto'])
    ]),
};

Task.defaultProps = {
    id: undefined,
    parent: undefined,
    onCompleted: undefined,
    onUncompleted: undefined,
    onClick: undefined,
    onChange: undefined,
    onTimerPlay: undefined,
    onTimerPause: undefined,
    stackable: undefined,
};

function formatPriority(priority) {
    switch(priority){
    case -1:
        return '🔽';
    default:
    case 0:
        return '';
    case 1:
        return '🔼';
    case 2:
        return '⏫';
    }
}

function formatDifficulty(difficulty) {
    switch(difficulty){
    case -1:
        return ' 🥱';
    default:
    case 0:
        return '';
    case 1:
        return ' 😥';
    case 2:
        return ' 😰';
    }
}

function formatDate(timestamp) {
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
            return 'Hoy a las ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0') + ' ';
        }
        if (today.getMonth() === date.getMonth() && today.getDate() + 1 === date.getDate()) {
            return 'Mañana a las ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0') + ' ';
        }
        return date.getDate() + ' de ' + months[date.getMonth()] + ' ';
    }
    return date.getDate() + ' de ' + months[date.getMonth()] + ' de ' + date.getFullYear() + ' ';
}
