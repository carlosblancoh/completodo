import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card';
import Icon from './Icon';


export default function Group({id, value, onClick}) {
    let isStackable = false;
    let subtitleText = undefined;


    if (value.children !== undefined && value.children.length !== 0) {
        subtitleText = '';
        if (value.subgroups === 1) {
            subtitleText = value.subgroups + ' grupo';
        } else if (value.subgroups > 1){
            subtitleText = value.subgroups + ' grupos';
        }
        if (value.subgroups > 0 && (value.pendingTasks > 0 || value.notes > 0)) {
            subtitleText += ', ';
        } else if (value.subgroups > 0){
            subtitleText += '.';
        }
        if (value.pendingTasks === 1) {
            subtitleText += value.pendingTasks + ' tarea';
        } else if (value.pendingTasks > 1){
            subtitleText += value.pendingTasks + ' tareas';
        }
        if (value.pendingTasks > 0 && value.notes > 0) {
            subtitleText += ', ';
        } else if (value.pendingTasks > 0){
            subtitleText += '.';
        }
        if (value.notes === 1) {
            subtitleText += value.notes + ' nota.';
        } else if (value.notes > 1){
            subtitleText += value.notes + ' notas.';
        }
    }

    return (
        <Card
            key={id}
            variant = 'glass'
            stackable = {isStackable}
            pinned = {value.visibility === 'pinned' && value.color}
        >
            <Card.Header onClick = {onClick}>
                <Card.Header.Left>
                    <Icon
                        name='circle'
                        fill= {true}
                        color={value.color}
                        size={2}
                    />
                </Card.Header.Left>
                <Card.Header.Title
                    title={value.title}
                    editionDisabled
                    subtitle={subtitleText}
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

Group.propTypes = {
    id: PropTypes.string,
    value: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

Group.defaultProps = {
    id: undefined,
    onClick: undefined,
};
