import PropTypes from 'prop-types';
import React from 'react';
import './style.css';




/**
 * Atributos y campos de información adicional para los items.
 */
export default function Attribute({children}) {
    return (
        <div
            className='component-Attribute'
        >
            {children}
        </div>
    );
}

Attribute.propTypes = {
    /**
    * Hijos para la composición del elemento
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

Attribute.defaultProps = {
    children: undefined,
};

/**
 * Nombre del atributo
 */
Attribute.Title = function ({title}) {
    return (
        <div
            className={'component-Attribute-title'}
        >
            {title}
        </div>
    );
};

Attribute.Title.displayName = 'Attribute.Title';

Attribute.Title.propTypes = {
    /**
    * Nombre del atributo.
    */
    title: PropTypes.string,
};

Attribute.Title.defaultProps = {
    title: undefined,
};

/**
 * Contenido del atributo.
 */
Attribute.Middle = function ({children}) {
    return (
        <div
            className={'component-Attribute-middle'}
        >
            {children}
        </div>
    );
};

Attribute.Middle.displayName = 'Attribute.Middle';

Attribute.Middle.propTypes = {
    /**
    * Hijos para el contenido del atributo.
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

Attribute.Middle.defaultProps = {
    children: undefined,
};

/**
 * Contenido auxiliar del atributo.
 */
Attribute.Right = function ({children, onClick : onClickEvent}) {
    function onClick(event) {
        if (onClickEvent) {
            event.stopPropagation();
            onClickEvent();
        }
    }

    return (
        <div
            className={'component-Attribute-right'}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

Attribute.Right.displayName = 'Attribute.Right';

Attribute.Right.propTypes = {
    /**
    * Hijos para el contenido auxiliar del atributo
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    /**
    * Evento llamado al hacer click.
    */
    onClick: PropTypes.func,
};

Attribute.Right.defaultProps = {
    children: undefined,
    onClick: undefined,
};
