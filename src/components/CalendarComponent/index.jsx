import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Card from '../Card';
import Icon from '../Icon';
import './style.css';




/**
 * Componente calendario.
 */
export default function CalendarComponent({today, onClick, blocks}) {
    const [selected, setSelected] = useState(new Date(Date.now()));
    const year = selected.getFullYear();
    const month = selected.getMonth();
    const daysInMonth = new Date(year, month+1, 0).getDate();
    let startingWeekday = new Date(year, month, 1).getDay();
    //Conversión inicio de semana lunes
    startingWeekday = (startingWeekday+6)%7;

    function previousMonth() {
        setSelected(new Date(year, month-1, 1));
    }

    function nextMonth() {
        setSelected(new Date(year, month+1, 1));
    }

    let dayElements = [];
    for (let i = 1; i <= daysInMonth; i++){
        let classes = [
            'component-calendar-day',
        ];
        if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
            classes.push('component-calendar-today');
        }
        const start = new Date(year, month, i, 0, 0);
        const end = new Date(year, month, i, 23, 59);
        const dayBlocks = blocks.filter(
            block => start.getTime() <= block.data.date.toDate().getTime() && end.getTime() >= block.data.date.toDate().getTime()
        );
        dayElements.push(
            <div
                key = {i}
                className = {classes.join(' ')}
                style={{
                    marginLeft:(i===1) && `calc(${startingWeekday}*100%/7)`
                }}
                onClick = {() => onClick?.(i, month, year)}
            >
                {i}
                <div className='component-calendar-block'>
                    {
                        dayBlocks.slice(0, dayBlocks.length > 9 ? 6 : 9).map(block => (
                            <Icon
                                key={block.id}
                                name='fiber_manual_record'
                                fill
                                color={block.data?.color ?? '#65C582'}
                                size= {0.5}
                            />
                        ))
                    }{
                        dayBlocks.length > 9 && (
                            <>
                                <br/>
                                <Icon
                                    name='more_horiz'
                                    size={0.8}
                                />
                            </>
                        )
                    }
                </div>
            </div>
        );
    }

    return (
        <Card variant='glass'>
            <Card.Header>
                <Card.Header.Left onClick={previousMonth}>
                    <Icon name='arrow_back_ios'/>
                </Card.Header.Left>
                <Card.Header.Title
                    title={
                        selected.toLocaleString('default', {month: 'long'})
                    }
                    subtitle={
                        selected.toLocaleString('default', {year: 'numeric'})
                    }
                    editionDisabled
                    centered
                />
                <Card.Header.Right onClick={nextMonth}>
                    <Icon name='arrow_forward_ios'/>
                </Card.Header.Right>
            </Card.Header>
            <Card.Body>

                <div className='component-calendar'>
                    <div className='component-calendar-weekDay'>LUN</div>
                    <div className='component-calendar-weekDay'>MAR</div>
                    <div className='component-calendar-weekDay'>MIE</div>
                    <div className='component-calendar-weekDay'>JUE</div>
                    <div className='component-calendar-weekDay'>VIE</div>
                    <div className='component-calendar-weekDay'>SAB</div>
                    <div className='component-calendar-weekDay'>DOM</div>
                    {
                        dayElements
                    }
                </div>
            </Card.Body>
        </Card>
    );
}

CalendarComponent.propTypes = {
    /**
    * Fecha del día presente.
    */
    today: PropTypes.instanceOf(Date),
    /**
    * Fecha del día seleccionado.
    */
    selected: PropTypes.instanceOf(Date),
    /**
    * Evento llamado al hacer click.
    */
    onClick: PropTypes.func,
    /**
    * Lista de eventos a mostrar.
    */
    blocks: PropTypes.array,
};

CalendarComponent.defaultProps = {
    today: new Date(Date.now()),
    selected: new Date(Date.now()),
    onClick: undefined,
    blocks: undefined,
};
