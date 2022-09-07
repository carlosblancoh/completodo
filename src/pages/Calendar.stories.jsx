import React from 'react';
import CalendarComponent from './Calendar';

export default {
    title: 'Pages/Calendar',
    component: CalendarComponent,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const Template = (args) => <CalendarComponent {...args} />;
export const Calendar = Template.bind({});
Calendar.args = {
    'items': [],
    'blocks': [],
    'selectedDayString': '15 de agosto de 2022',
    'profilePicture': '/logo512.png'
};
