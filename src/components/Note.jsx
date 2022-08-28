import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Card from './Card';
import Icon from './Icon';

export default function Note({id, value, parent, onClick, onChange}) {
    const [expandedContent, setExpandedContent] = useState(false);

    function onTitleChange({title}) {
        onChange?.({
            ...value,
            title: title,
        });
    }

    function onArrowClick() {
        setExpandedContent(!expandedContent);
    }

    if (value.text !== undefined && value.text.length !== 0) {
        return (
            <Card
                key={id}
                variant = 'plain'
                pinned = {value.visibility === 'pinned' && (parent?.color ?? '#65c582')}
            >
                <Card.Header onClick = {onClick}>
                    <Card.Header.Left>
                        <Icon name={'sticky_note_2'}/>
                    </Card.Header.Left>
                    <Card.Header.Title
                        title={value.title}
                        subtitle={formatDate(value.scheduledDate?.toDate?.() ?? Infinity) + formatPriority(value.priority)}
                        onChange={onTitleChange}
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
                <Card.Body collapsed={!expandedContent}>
                    <Card>
                        <Card.Header onClick = {onClick}>
                            <p style={{
                                whiteSpace: 'pre-wrap',
                                margin: '1rem'}}
                            >{value.text}</p>
                        </Card.Header>
                    </Card>
                </Card.Body>
            </Card>
        );
    }
    return (
        <Card
            key={id}
            variant = 'plain'
            pinned = {value.visibility === 'pinned' && (parent?.color ?? '#65c582')}
        >
            <Card.Header onClick = {onClick}>
                <Card.Header.Left>
                    <Icon name={'sticky_note_2'}/>
                </Card.Header.Left>
                <Card.Header.Title
                    title={value.title}
                    subtitle={formatDate(value.scheduledDate?.toDate?.() ?? Infinity) + formatPriority(value.priority)}
                    onChange={onTitleChange}
                />
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

Note.propTypes = {
    value: PropTypes.object.isRequired,
    id: PropTypes.string,
    parent: PropTypes.object,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
};

Note.defaultProps = {
    id: undefined,
    parent: undefined,
    onClick: undefined,
    onChange: undefined,
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
        if (today.getMonth() === date.getMonth() && today.getDate() + 1 === date.getDatet()) {
            return 'Mañana a las ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0') + ' ';
        }
        return date.getDate() + ' de ' + months[date.getMonth()] + ' ';
    }
    return date.getDate() + ' de ' + months[date.getMonth()] + ' de ' + date.getFullYear() + ' ';
}
