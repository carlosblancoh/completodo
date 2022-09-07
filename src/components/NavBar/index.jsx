import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import './style.css';



/**
 * Barra de navegación inferior.
 */
export default function NavBar({children}) {
    let classes = [
        'component-navBar',
    ];
    return (
        <>
            <div className= 'blankSpace'
            />
            <nav
                className={classes.join(' ')}
            >
                <ul>
                    {children}
                </ul>
            </nav>
        </>

    );
}

NavBar.propTypes = {
    /**
    * Hijos para el contenido de la barra.
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

NavBar.defaultProps = {
    children: undefined,
};

/**
* Pestañas de la barra de navegación.
*/
NavBar.Tab = function ({icon, name, active, onClick}) {
    let classes = [
        'component-navBar-tab',
    ];
    if (active) {
        classes.push('component-navBar-tab-active');
    }
    return(
        <li
            className={classes.join(' ')}
            onClick={onClick}
        >
            <Icon name={icon} fill={active} size={1.5}/>
            <span>
                {name}
            </span>
        </li>
    );
};

NavBar.Tab.displayName = 'NavBar.Tab';

NavBar.Tab.propTypes = {
    /**
    * Icono de la pestaña.
    */
    icon: PropTypes.string,
    /**
    * Nombre de la pestaña.
    */
    name: PropTypes.string,
    /**
    * ¿Es esta la pestaña activa?
    */
    active: PropTypes.bool,
    /**
    * Evento llamado al hacer click.
    */
    onClick: PropTypes.func,
};

NavBar.Tab.defaultProps = {
    icon: undefined,
    name: undefined,
    active: undefined,
    onClick: undefined,
};
