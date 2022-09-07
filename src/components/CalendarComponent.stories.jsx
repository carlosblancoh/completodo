import React from 'react';
import CalendarComponent from './CalendarComponent';


export default {
    title: 'Components/CalendarComponent',
    component: CalendarComponent,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        today: {
            control: {
                type:'date'
            }
        },
        selected: {
            control: {
                type:'date'
            }
        },
    },
};

const Template = (args) => {
    args.today = args.today && new Date(args.today);
    args.selected = args.selected && new Date(args.selected);
    return (
        <CalendarComponent {...args} />
    );
};
export const basicCalendar = Template.bind({});
basicCalendar.args = {
    today: Date.now(),
    blocks: [],
};
