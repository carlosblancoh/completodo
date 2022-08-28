import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../components/Icon';
import TopBar from '../../components/TopBar';
import ItemController from '../../controllers/ItemController';
import './style.css';
import TextField from '../../components/TextField';


export default function Search({items, searchString, onSearchStringChange, onBack}) {

    return (
        <div>
            <TopBar variant='onGlass'>
                <TopBar.Left onClick = {onBack}>
                    <Icon name='arrow_back_ios'/>
                </TopBar.Left>
                <div style={{
                    width:'80%'
                }}>
                    <TextField
                        value={searchString}
                        onChange={onSearchStringChange}
                        variant='search'
                        placeholder='Buscar'
                    />
                </div>


            </TopBar>
            {(items?.length === 0) && (
                ((searchString === '') ? (
                    <div className='emptySearchMessage'>
                        <br/>
                        Introduce el término que quieras buscar en la barra de búsqueda superior.
                        <br/><br/>
                    </div>
                ) : (
                    <div className='emptySearchMessage'>
                        <br/>
                        Ningún elemento coincide con el texto introducido.
                        <br/><br/>
                    </div>
                ))
            )}
            {items?.map?.(item => (
                <ItemController
                    key = {item.id}
                    id = {item.id}
                />
            ))}
        </div>
    );
}

Search.propTypes = {
    items: PropTypes.array,
    searchString: PropTypes.string,
    onSearchStringChange: PropTypes.func,
    onBack: PropTypes.func,
};

Search.defaultProps = {
    items: undefined,
    searchString: '',
    onSearchStringChange: undefined,
    onBack: undefined,
};
