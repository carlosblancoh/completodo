import React from 'react';
import Icon from './Icon';
import TopBar from './TopBar';


export default {
    title: 'Components/TopBar',
    component: TopBar,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const _Template = (args) => <TopBar {...args} />;
export const home = (args) => (
    <TopBar {...args}>
        <TopBar.Title
            title='AppName'
            main
        />
        <TopBar.Right>
            <Icon name='search'/>
        </TopBar.Right>
        <TopBar.Right>
            <Icon name='account_circle'/>
        </TopBar.Right>
    </TopBar>
);
home.args = {
    variant: 'onGlass',
};
export const onFolder = (args) => (
    <TopBar {...args}>
        <TopBar.Left>
            <Icon name='arrow_back_ios'/>
        </TopBar.Left>
        <TopBar.Left>
            <Icon name='circle'/>
        </TopBar.Left>
        <TopBar.Title
            title='FolderName'
        />
        <TopBar.Right>
            <Icon name='bookmark'/>
        </TopBar.Right>
        <TopBar.Right>
            <Icon name='insert_chart'/>
        </TopBar.Right>
        <TopBar.Right>
            <Icon name='edit'/>
        </TopBar.Right>
    </TopBar>
);
onFolder.args = {
    variant: 'onGlass',
};
export const onSearch = (args) => (
    <TopBar {...args}>
        <TopBar.Left>
            <Icon name='arrow_back_ios'/>
        </TopBar.Left>
        <TopBar.SearchBar placeholder='Busca aquí lo que quieras.'/>
    </TopBar>
);
onSearch.args = {
    variant: 'onGlass',
};
export const onCard = (args) => (
    <TopBar {...args}>
        <TopBar.Left>
            <Icon name='arrow_back_ios'/>
        </TopBar.Left>
        <TopBar.Title
            title='FolderName'
            back
        />
        <TopBar.Right>
            <Icon name='bookmark'/>
        </TopBar.Right>
        <TopBar.Right>
            <Icon name='insert_chart'/>
        </TopBar.Right>
        <TopBar.Right>
            <Icon name='edit'/>
        </TopBar.Right>
    </TopBar>
);
onCard.args = {
    variant: 'noBackground',
};
