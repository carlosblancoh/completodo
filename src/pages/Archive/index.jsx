import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../components/Icon';
import TopBar from '../../components/TopBar';
import ItemController from '../../controllers/ItemController';

/**
* Pantalla de ver archivo.
*/
export default function Archive({items, onBack}) {
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
                    name='inventory_2'
                    size={1.5}
                />
                <TopBar.Title
                    title='Archivo'
                />
            </TopBar>
            {listItems}
        </div>
    );
}

Archive.propTypes = {
    /**
    * Lista de elementos archivados.
    */
    items: PropTypes.array,
    /**
    * Evento llamado al volver a la pantalla anterior.
    */
    onBack: PropTypes.func,
};

Archive.defaultProps = {
    onBack: undefined,
};
