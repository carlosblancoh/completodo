import PropTypes from 'prop-types';
import React from 'react';
import { hexToRgb } from '../../utils';
import TextField from '../TextField';
import './style.css';




/**
 * Barra de navegación superior.
 */
export default function TopBar({children, variant, color}) {
    let classes = [
        'component-topBar',
        `component-topBar-${variant}`,
    ];
    let backgroundColor;
    let textColor;
    /** */
    if (variant === 'noBackground'){
        if (color !== undefined){
            const opacity = 0.32;
            const colorResult = hexToRgb(color);
            if ((colorResult.r*0.299 + colorResult.g*0.587 + colorResult.b*0.114) > 186) {
                textColor = 'var(--text-primary)';
            } else {
                textColor = '#ffffff';
            }
            backgroundColor = `rgba(${colorResult.r}, ${colorResult.g}, ${colorResult.b}, ${opacity})`;
        }
    }
    return (
        <section
            className={classes.join(' ')}
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
            }}
        >
            {children}
        </section>
    );
}

TopBar.propTypes = {
    /**
    * Hijos para la composición del componente.
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    /**
    * Tipo de barra, sin fondo o con transparencia.
    */
    variant: PropTypes.oneOf(['noBackground', 'onGlass']),
    /**
    * Color de la barra de navegación.
    */
    color: PropTypes.string,
};

TopBar.defaultProps = {
    children: undefined,
    variant: 'onGlass',
    color: undefined,
};

/**
* Zona izquierda de la barra.
*/
TopBar.Left = function ({children, onClick}) {
    return (
        <div
            className={'component-topBar-left'}
            onClick = {onClick}
        >
            {children}
        </div>
    );
};

TopBar.Left.displayName = 'TopBar.Left';

TopBar.Left.propTypes = {
    /**
    * Hijos para el contenido.
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    /**
    * Evento llamado al hacer click.
    */
    onClick: PropTypes.func,
};

TopBar.Left.defaultProps = {
    children: undefined,
    onClick: undefined,
};

/**
* Zona derecha de la barra.
*/
TopBar.Right = function ({children, onClick : onClickEvent}) {
    function onClick(event) {
        if (onClickEvent) {
            event.stopPropagation();
            onClickEvent();
        }
    }
    return (
        <div
            className={'component-topBar-right'}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

TopBar.Right.displayName = 'TopBar.Right';

TopBar.Right.propTypes = {
    /**
    * Hijos para el contenido.
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    /**
    * Evento llamado al hacer click.
    */
    onClick: PropTypes.func,
};

TopBar.Right.defaultProps = {
    children: undefined,
    onClick: undefined,
};

/**
* Zona para el título de la barra.
*/
TopBar.Title = function ({title, main, back}) {
    return (
        <div
            className={'component-topBar-title'}
        >
            {title && (
                <h1
                    style={{
                        fontSize: main && '1.4rem',
                        fontWeight: back && '300',
                    }}
                >
                    {title}
                </h1>
            )}
        </div>
    );
};

TopBar.Title.displayName = 'TopBar.Title';

TopBar.Title.propTypes = {
    /**
    * Título de la barra.
    */
    title: PropTypes.string,
    /**
    * ¿Es un título principal?
    */
    main: PropTypes.bool,
    /**
    * ¿Es un título asociado a la acción de volver atrás?
    */
    back: PropTypes.bool,
};

TopBar.Title.defaultProps = {
    title: undefined,
    main: undefined,
    back: undefined,
};

/**
* Campo de búsqueda en la barra superior.
*/
TopBar.SearchBar = function ({placeholder}) {
    return (
        <TextField
            variant='search'
            placeholder={placeholder}
        />
    );
};

TopBar.SearchBar.displayName = 'TopBar.SearchBar';

TopBar.SearchBar.propTypes = {
    /**
    * Texto mostrado en la barra de búsqueda vacía.
    */
    placeholder: PropTypes.string,
};

TopBar.SearchBar.defaultProps = {
    placeholder: undefined,
};
