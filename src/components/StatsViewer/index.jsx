import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Attribute from '../Attribute';
import ExpandedCard from '../ExpandedCard';
import Icon from '../Icon';
import TopBar from '../TopBar';
import BlurredOverlay from '../BlurredOverlay';
import './style.css';


export default function StatsViewer({value, _onClick, onCloseStats}) {
    const [closed, setClosed] = useState(false);
    let popupTitle = 'Estadísticas';

    function close() {
        setClosed(true);
        setTimeout(() => onCloseStats(), 1000);
    }

    function onBackClick() {
        close();
    }

    return (
        <>
            <BlurredOverlay visible={!closed}>
                <div className='statsSizeLimitter'>
                    <ExpandedCard
                        className = 'component-StatsViewer-Popup'
                        variant = 'glass'
                    >
                        <ExpandedCard.Top>
                            <TopBar variant='noBackground'>
                                <TopBar.Left onClick = {onBackClick}>
                                    <Icon name='arrow_back_ios'/>
                                    <span style={{
                                        fontWeight:300,
                                        padding: '0.5rem'}}>Volver</span>
                                </TopBar.Left>
                            </TopBar>
                        </ExpandedCard.Top>
                        <ExpandedCard.Body>
                            <div style={{
                                margin: '0 1rem 1rem 1rem',
                                textAlign: 'center',
                                opacity: '0.5',
                                fontSize: '1.2rem',
                                fontWeight: '300',
                            }}>
                                {popupTitle}
                            </div>
                            <Attribute>
                                <Attribute.Title
                                    title='Tareas completadas: '
                                />
                                <Attribute.Middle>
                                    Has completado {value.completedTasks} de {value.totalTasksCreated} tareas totales.
                                </Attribute.Middle>
                            </Attribute>
                            <Attribute>
                                <div
                                    style={{
                                        width: '100%',
                                        height: '2rem',
                                        backgroundColor: '#707070',
                                        margin: '-1rem 1rem 0 1.5rem',
                                        border: '0.05rem solid rgba(112, 112, 112, 0.5)',
                                        borderRadius: '1rem',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: value.completedTasksP * 100 + '%',
                                            height: '2rem',
                                            backgroundColor: value.color,
                                            borderRadius: '1rem 0 0 1rem',
                                        }}
                                    >
                                    </div>
                                </div>
                            </Attribute>
                            <Attribute>
                                <Attribute.Title
                                    title='Tareas completadas a tiempo: '
                                />
                                <Attribute.Middle>
                                    {value.tasksCompletedOnTime} tareas de {value.completedTasks} tareas completadas en total.
                                </Attribute.Middle>
                            </Attribute>
                            <Attribute>
                                <div
                                    style={{
                                        width: '100%',
                                        height: '1rem',
                                        backgroundColor: '#707070',
                                        margin: '-1rem 1rem 0 1.5rem',
                                        border: '0.05rem solid rgba(112, 112, 112, 0.5)',
                                        borderRadius: '1rem',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: value.tasksCompletedOnTimeP * 100 + '%',
                                            height: '1rem',
                                            backgroundColor: '#65C582',
                                            borderRadius: '1rem 0 0 1rem',
                                        }}
                                    >
                                    </div>
                                </div>
                            </Attribute>
                            <Attribute>
                                <Attribute.Title
                                    title='Tareas atrasadas: '
                                />
                                <Attribute.Middle>
                                    {value.overdueTasks} tareas van con retraso de {value.uncompletedTasks} tareas pendientes.
                                </Attribute.Middle>
                            </Attribute>
                            <Attribute>
                                <div
                                    style={{
                                        width: '100%',
                                        height: '1rem',
                                        backgroundColor: '#707070',
                                        margin: '-1rem 1rem 0 1.5rem',
                                        border: '0.05rem solid rgba(112, 112, 112, 0.5)',
                                        borderRadius: '1rem',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: value.overdueTasksP * 100 + '%',
                                            height: '1rem',
                                            backgroundColor: '#ff9500',
                                            borderRadius: '1rem 0 0 1rem',
                                        }}
                                    >
                                    </div>
                                </div>
                            </Attribute>
                            <Attribute>
                                <Attribute.Title
                                    title='Tiempo total trabajado en el grupo: '
                                />
                                <Attribute.Middle>
                                    {durationWithSecondsConversion(value.totalWorkingTime)}
                                </Attribute.Middle>
                            </Attribute>
                            <Attribute>
                                <Attribute.Title
                                    title='Tiempo medio por tarea completada: '
                                />
                                <Attribute.Middle>
                                    {durationWithSecondsConversion(value.meanTaskTime)} en {value.completedTimedTasks}&nbsp;tareas.
                                </Attribute.Middle>
                            </Attribute>
                            <Attribute>
                                <Attribute.Title
                                    title='Elementos por tipos: '
                                />
                                <Attribute.Middle>
                                    {value.tasks}&nbsp;tareas, {value.notes}&nbsp;notas, {value.groups}&nbsp;grupos.
                                </Attribute.Middle>
                            </Attribute>
                            <Attribute>
                                <div
                                    style={{
                                        width: '100%',
                                        height: '1rem',
                                        backgroundColor: '#FFE183',
                                        margin: '-1rem 1rem 0 1.5rem',
                                        border: '0.05rem solid rgba(112, 112, 112, 0.5)',
                                        borderRadius: '1rem',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: value.tasksP * 100 + '%',
                                            height: '1rem',
                                            backgroundColor: '#65C582',
                                            borderRadius: '1rem 0 0 1rem',
                                            float: 'left',
                                        }}
                                    >
                                    </div>
                                    <div
                                        style={{
                                            width: value.groupsP * 100 + '%',
                                            height: '1rem',
                                            backgroundColor: '#9363B6',
                                            borderRadius: '0 1rem 1rem 0',
                                            float: 'right',
                                        }}
                                    ></div>
                                </div>
                            </Attribute>
                            <Attribute>
                                <Attribute.Title
                                    title='Elementos archivados: '
                                />
                                <Attribute.Middle>
                                    {value.archivedItems} de {value.totalItems} elementos totales.
                                </Attribute.Middle>
                            </Attribute>
                            <Attribute>
                                <div
                                    style={{
                                        width: '100%',
                                        height: '1rem',
                                        backgroundColor: '#707070',
                                        margin: '-1rem 1rem 0 1.5rem',
                                        border: '0.05rem solid rgba(112, 112, 112, 0.5)',
                                        borderRadius: '1rem',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: value.overdueTasksP * 100 + '%',
                                            height: '1rem',
                                            backgroundColor: value.color,
                                            borderRadius: '1rem 0 0 1rem',
                                        }}
                                    >
                                    </div>
                                </div>
                            </Attribute>
                        </ExpandedCard.Body>
                    </ExpandedCard>
                </div>
            </BlurredOverlay>
        </>
    );
}

StatsViewer.propTypes = {
    value: PropTypes.object.isRequired,
    _onClick: PropTypes.func,
    onCloseStats: PropTypes.func,
};

StatsViewer.defaultProps = {
    _onClick: undefined,
    onCloseStats: undefined,
};


function durationWithSecondsConversion(value) {
    const duration = value;
    if (!duration) {
        return '';
    }
    const hours = (Math.floor(duration/3600)).toString().padStart(2, '0');
    const minutes = (Math.floor((duration%3600)/60)).toString().padStart(2, '0');
    const seconds = (Math.floor(duration%60)).toString().padStart(2, '0');
    let result = seconds + 's';
    if (minutes !== '00') {
        result = minutes + 'm ' + result;
        if (hours !== '00') {
            result = hours + 'h ' + result;
        }
    }
    return result;
}
