import PropTypes from 'prop-types';
import React from 'react';
import './style.css';




/**
 * Atributos de información de las tareas y grupos.
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
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

Attribute.defaultProps = {
    children: undefined,
};

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
    title: PropTypes.string,
};

Attribute.Title.defaultProps = {
    title: undefined,
};

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
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

Attribute.Middle.defaultProps = {
    children: undefined,
};

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
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    onClick: PropTypes.func,
};

Attribute.Right.defaultProps = {
    children: undefined,
    onClick: undefined,
};
