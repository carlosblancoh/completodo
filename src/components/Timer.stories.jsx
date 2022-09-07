import React from 'react';
import TimerComponent from './Timer';


export default {
    title: 'Components/Timer',
    component: TimerComponent,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

export const PausedTimer = (_args) => (
    <TimerComponent paused>
    </TimerComponent>
);

export const StartedTimer = (_args) => (
    <TimerComponent start={new Date(Date.now())}>
    </TimerComponent>
);
