import React from 'react';
import BlurredOverlay from './BlurredOverlay';


export default {
    title: 'Components/BlurredOverlay',
    component: BlurredOverlay,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
    parameters: {
        docs: {
            inlineStories: false,
        }
    }
};


export const Overlay = (_args) => (
    <BlurredOverlay></BlurredOverlay>
);
