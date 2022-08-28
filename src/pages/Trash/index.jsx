import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../components/Icon';
import TopBar from '../../components/TopBar';
import ItemController from '../../controllers/ItemController';


export default function Trash({items, onBack}) {
    const listItems = [];

    if (items !== undefined && items.length !== 0) {
        for (const item of items) {
            listItems.push(
                <ItemController
                    id = {item}
                    key = {item}
                />
            );
        }
    }

    return (
        <div>
            <TopBar variant='onGlass'>
                <TopBar.Left onClick = {onBack}>
                    <Icon name='arrow_back_ios'/>
                </TopBar.Left>
                <Icon
                    name='delete'
                    size={1.5}
                />
                <TopBar.Title
                    title='Papelera'
                />
            </TopBar>
            {listItems}
        </div>
    );
}

Trash.propTypes = {
    items: PropTypes.array,
    onBack: PropTypes.func,
};

Trash.defaultProps = {
    onBack: undefined,
};
