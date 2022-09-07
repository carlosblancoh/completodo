import React from 'react';
import ProfileComponent from './Profile';

export default {
    title: 'Pages/Profile',
    component: ProfileComponent,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const Template = (args) => <ProfileComponent {...args} />;
export const Profile = Template.bind({});
Profile.args = {
    'value': {
        'autoArchive': true,
        'name': 'Carlos',
    },
    'email': 'carlosblancoh@usal.es',
    'profilePicture': '/logo512.png'
};
