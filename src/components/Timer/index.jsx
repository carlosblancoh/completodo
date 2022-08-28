import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import PropTypes from 'prop-types';
import './style.css';

export default function Timer({value, start, paused, onPlay, onPause}) {
    const [now, setNow] = useState(new Date(Date.now()));
    const [realPaused, setRealPaused] = useState(paused);

    useEffect(() => {
        setTimeout(()=>setRealPaused(paused), 500);
        if (!paused) {
            const interval = setInterval(() => {
                setNow(new Date(Date.now()));
            }, 1000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [paused]);

    function play() {
        const startDate = new Date(Date.now());
        setNow(new Date(Date.now()));
        onPlay?.(startDate);
    }

    function pause() {
        onPause?.(new Date(Date.now()));
    }

    if (realPaused) {
        return (
            <span
                onClick={play}
                style={{
                    maxHeight: '24px',
                }}
                className={!paused ? 'component-timer-hide' : 'component-timer-show'}
            >
                <Icon name='timer'></Icon>
            </span>
        );
    } else {
        const diff = Math.abs(now.getTime() - start.getTime());
        const elapsedSeconds = value + Math.floor(diff/1000);
        return (
            <span
                onClick={pause}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                className={paused ? 'component-timer-hide' : 'component-timer-show'}
            >
                <Icon name='pause_circle'></Icon>
                <span>{durationWithSecondsConversion(elapsedSeconds)}</span>
            </span>
        );
    }
}

Timer.propTypes = {
    value: PropTypes.number,
    start: PropTypes.instanceOf(Date),
    paused: PropTypes.bool,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
};

Timer.defaultProps = {
    value: 0,
    start: undefined,
    paused: undefined,
    onPlay: undefined,
    onPause: undefined,
};

function durationWithSecondsConversion(value) {
    const duration = value;
    if (!duration) {
        return '';
    }
    const hours = (Math.floor(duration/3600)).toString().padStart(2, '0');
    const minutes = (Math.floor((duration%3600)/60)).toString().padStart(2, '0');
    const seconds = (Math.floor(duration%60)).toString().padStart(2, '0');
    let result = seconds;
    if (minutes !== '00') {
        result = minutes + ':' + result;
        if (hours !== '00') {
            result = hours + ':' + result;
        }
    }
    return result;
}
