import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import './style.css';



/**
 * Barra de navegación.
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
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

NavBar.defaultProps = {
    children: undefined,
};

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
    icon: PropTypes.string,
    name: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func,
};

NavBar.Tab.defaultProps = {
    icon: undefined,
    name: undefined,
    active: undefined,
    onClick: undefined,
};
