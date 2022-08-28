import React from 'react';
import Attribute from './Attribute';
import Icon from './Icon';


export default {
    title: 'Components/Attribute',
    component: Attribute,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const _Template = (args) => <Attribute {...args} />;
export const Location = (args) => (
    <Attribute {...args}>
        <Attribute.Title
            title='Ubicación'
        />
        <Attribute.Middle>
            <p>
                Pl. Caídos, s/n, 37008 Salamanca
            </p>
        </Attribute.Middle>
        <Attribute.Right>
            <Icon name='pin_drop'/>
        </Attribute.Right>
        <Attribute.Right>
            <Icon
                name='cancel'
                color= '#ff3b30'
            />
        </Attribute.Right>
    </Attribute>
);
location.args = {

};
