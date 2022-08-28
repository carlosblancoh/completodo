import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Confetti from 'react-dom-confetti';
import Card from './Card';
import Icon from './Icon';
import TaskController from '../controllers/TaskController';
import usePrevious from '../hooks/previous';

export default function Block({id, value, onCompleted, onUncompleted, onClick, toDoS, group}) {
    const [expandedContent, setExpandedContent] = useState(true);
    const wasCompleted = usePrevious(value.completed);


    function formatEndDate() {
        if (value.duration !== 0) {
            const endDate = new Date(value.date.toDate().getTime() + (value.duration * 1000));
            return '- ' + endDate.getHours().toString().padStart(2, '0') + ':' + endDate.getMinutes().toString().padStart(2, '0');
        } else {
            return '';
        }
    }

    function onCheckBoxClick() {
        if (value.completed) {
            onUncompleted?.();
            setExpandedContent(true);
        } else {
            onCompleted?.();
            setExpandedContent(false);
        }
    }

    function onArrowClick() {
        setExpandedContent(!expandedContent);
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
        colors: [(group?.color ?? value?.color ?? '#65C582')]
        //colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
    };

    if (toDoS !== undefined && toDoS.length !== 0) {
        const listTasks = [];
        for (const child of toDoS) {
            listTasks.push(
                <TaskController
                    id = {child.id}
                    key = {child.id}
                    stackable={true}
                />
            );
        }
        return (
            <Card
                key={id}
                variant = 'plain'
                color = {group?.color ?? value?.color ?? '#65C582'}
                dimmed = {value.completed}
            >
                <Card.Header onClick = {onClick}>
                    {value.completable ? (
                        <Card.Header.Left
                            onClick={onCheckBoxClick}
                        >
                            <Confetti
                                active={wasCompleted !== value.completed && value.completed}
                                config={config}
                                className='confetti'
                            />
                            <Icon name={(value.completed ? 'event_available' : 'calendar_today')}/>
                        </Card.Header.Left>
                    ) : (
                        <Card.Header.Left>
                            <Icon name='event'/>
                        </Card.Header.Left>
                    )}
                    <Card.Header.Title
                        title={value.title}
                        editionDisabled
                        subtitle={formatDate(value.date?.toDate?.()) + formatEndDate()}
                    />
                    <Card.Header.Right onClick={onArrowClick}>
                        <span
                            style={{
                                transform: `rotate(${expandedContent ? '180deg' : '0deg'}) translateY(${expandedContent ? '0.3rem' : '0'})`,
                                transition: 'transform 0.5s',
                            }}
                        >
                            <Icon name='expand_more'/>
                        </span>
                    </Card.Header.Right>
                </Card.Header>
                <Card.Body collapsed={!expandedContent}>
                    {listTasks}
                </Card.Body>
            </Card>
        );
    }
    return (
        <Card
            key={id}
            variant = 'plain'
            color = {group?.color ?? value?.color ?? '#65C582'}
            dimmed = {value.completed}
        >
            <Card.Header onClick = {onClick}>
                {value.completable ? (
                    <Card.Header.Left
                        onClick={onCheckBoxClick}>
                        <Confetti
                            active={wasCompleted !== value.completed && value.completed}
                            config={config}
                            className='confetti'
                        />
                        <Icon name={(value.completed ? 'event_available' : 'calendar_today')}/>
                    </Card.Header.Left>
                ) : (
                    <Card.Header.Left>
                        <Icon name='event'/>
                    </Card.Header.Left>
                )}
                <Card.Header.Title
                    title={value.title}
                    editionDisabled
                    subtitle={formatDate(value.date?.toDate?.()) + formatEndDate()}
                />
            </Card.Header>
        </Card>
    );
}

Block.propTypes = {
    value: PropTypes.object.isRequired,
    id: PropTypes.string,
    onCompleted: PropTypes.func,
    onUncompleted: PropTypes.func,
    onClick: PropTypes.func,
    toDoS: PropTypes.array,
    group: PropTypes.object,
};

Block.defaultProps = {
    id: undefined,
    onCompleted: undefined,
    onUncompleted: undefined,
    onClick: undefined,
    toDoS: undefined,
    group: undefined,
};

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
            return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0') + ' ';
        }
        if (today.getMonth() === date.getMonth() && today.getDate() + 1 === date.getDate()) {
            return 'Mañana, ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0') + ' ';
        }
        return date.getDate() + ' de ' + months[date.getMonth()] + ', ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0') + ' ';
    }
    return date.getDate() + ' de ' + months[date.getMonth()] + ' de ' + date.getFullYear() + ', ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0') + ' ';
}
