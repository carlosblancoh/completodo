import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import './style.css';



/**
 * Botón de acción.
 */
export default function Button({icon, text, color, textColor, onClick, variant}) {
    let classes = [
        'component-button',
        `component-button-${variant}`,
    ];
    return (
        <button
            className={classes.join(' ')}
            style={{
                backgroundColor: color,
                color: textColor,
            }}
            onClick = {onClick}
        >
            {icon && (<Icon name={icon}/>)}
            {text && (<span>{text}</span>)}
        </button>
    );
}

Button.propTypes = {
    /**
     * Nombre del icono del botón.
     */
    icon: PropTypes.string,
    /**
     * Texto del botón.
     */
    text: PropTypes.string,
    /**
     * Color del botón.
     */
    color: PropTypes.string,
    /**
     * Color del contenido del botón.
     */
    textColor:PropTypes.string,
    /**
     * Evento al accionar el botón.
     */
    onClick:PropTypes.func,

    variant:PropTypes.string,
};

Button.defaultProps = {
    icon: undefined,
    text: undefined,
    color: undefined,
    textColor: undefined,
    onClick: undefined,
    variant: undefined,
};
