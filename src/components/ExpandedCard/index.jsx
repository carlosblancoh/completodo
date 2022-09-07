import PropTypes from 'prop-types';
import React from 'react';
import { hexToRgb } from '../../utils';
import TextField from '../TextField';
import './style.css';




/**
 * Tarjeta expandida que muestra información y permite edición de los elementos.
 */
export default function ExpandedCard({children, variant, color}) {
    let textColor;
    const opacity = 0.32;
    let backgroundColor;
    if (color !== undefined){
        const colorResult = hexToRgb(color);
        if ((colorResult.r*0.299 + colorResult.g*0.587 + colorResult.b*0.114) > 186) {
            textColor = '#000000';
        } else {
            textColor = '#ffffff';
        }
        if (variant === 'glass') {
            backgroundColor = `rgba(${colorResult.r}, ${colorResult.g}, ${colorResult.b}, ${opacity})`;
        } else {
            backgroundColor = color;
        }
    }
    let classes = [
        'component-expandedCard',
        `component-expandedCard-${variant}`,
    ];

    return (
        <div>
            <section
                className={classes.join(' ')}
                style={{
                    backgroundColor: backgroundColor,
                    color: textColor,
                }}
            >
                {children}
            </section>
        </div>
    );
}

ExpandedCard.propTypes = {
    /**
    * Hijos para la composición del elemento.
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    /**
    * Tipo de tarjeta, normal o transparente.
    */
    variant: PropTypes.oneOf(['plain', 'glass']),
    /**
    * Color de la tarjeta.
    */
    color: PropTypes.string,
};

ExpandedCard.defaultProps = {
    children: undefined,
    variant: 'plain',
    color: undefined,
};

/**
* Zona superior de la tarjeta.
*/
ExpandedCard.Header = function ({children}) {
    return (
        <header
            className={'component-expandedCard-header'}
        >
            {children}
        </header>
    );
};

ExpandedCard.Header.displayName = 'ExpandedCard.Header';

ExpandedCard.Header.propTypes = {
    /**
    * Hijos para la composición del componente.
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

ExpandedCard.Header.defaultProps = {
    children: undefined,
};

/**
* Contenido de la tarjeta.
*/
ExpandedCard.Body = function ({children}) {
    return (
        <main
            className={'component-expandedCard-body'}
        >
            {children}
        </main>
    );
};

ExpandedCard.Body.displayName = 'ExpandedCard.Body';

ExpandedCard.Body.propTypes = {
    /**
    * Hijos para la composición del componente.
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

ExpandedCard.Body.defaultProps = {
    children: undefined,
};

/**
* Barra superior de la tarjeta.
*/
ExpandedCard.Top = function ({children}) {
    return (
        <main
            className={'component-expandedCard-top'}
        >
            {children}
        </main>
    );
};

ExpandedCard.Top.propTypes = {
    /**
    * Hijos para el contenido del componente.
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

ExpandedCard.Top.defaultProps = {
    children: undefined,
};

ExpandedCard.Top.displayName = 'ExpandedCard.Top';

/**
* Zona inferior de la tarjeta.
*/
ExpandedCard.Bottom = function ({children}) {
    return (
        <main
            className={'component-expandedCard-bottom'}
        >
            {children}
        </main>
    );
};

ExpandedCard.Bottom.displayName = 'ExpandedCard.Bottom';

ExpandedCard.Bottom.propTypes = {
    /**
    * Hijos para la composición del componente.
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

ExpandedCard.Bottom.defaultProps = {
    children: undefined,
};

/**
* Zona superior izquierda de la tarjeta.
*/
// eslint-disable-next-line react/display-name, react/prop-types
ExpandedCard.Header.Left = function ({children, onClick}) {
    return (
        <div
            className={'component-expandedCard-header-left'}
            onClick = {onClick}
        >
            {children}
        </div>
    );
};

ExpandedCard.Header.Left.displayName = 'ExpandedCard.Header.Left';

ExpandedCard.Header.Left.propTypes = {
    /**
    * Hijos para el contenido.
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    /**
    * Evento llamado al hacer click.
    */
    onClick: PropTypes.func,
};

ExpandedCard.Header.Left.defaultProps = {
    children: undefined,
    onClick: undefined,
};

/**
* Zona superior derecha de la tarjeta.
*/
// eslint-disable-next-line react/display-name, react/prop-types
ExpandedCard.Header.Right = function ({children, onClick}) {
    return (
        <div
            className={'component-expandedCard-header-right'}
            onClick = {onClick}
        >
            {children}
        </div>
    );
};

ExpandedCard.Header.Right.displayName = 'ExpandedCard.Header.Right';

ExpandedCard.Header.Right.propTypes = {
    /**
    * Hijos para el contenido.
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    /**
    * Evento llamado al hacer click.
    */
    onClick: PropTypes.func,
};

ExpandedCard.Header.Right.defaultProps = {
    children: undefined,
    onClick: undefined,
};

/**
* Espacio para el título de la tarjeta.
*/
// eslint-disable-next-line react/display-name, react/prop-types
ExpandedCard.Header.Title = function ({title, subtitle, centered, onChange}) {
    function onTitleChange(value) {
        onChange?.({
            title : value,
            subtitle : subtitle,
        });
    }
    function onSubtitleChange(value) {
        onChange?.({
            title : title,
            subtitle : value,
        });
    }
    return (
        <div
            className={'component-expandedCard-header-title'}
            style={{
                textAlign: centered && 'center',
            }}
        >
            {title !== undefined && (<h3><TextField
                value = {title}
                placeholder = 'Título'
                onChange = {onTitleChange}
                variant = 'resizable'
            /></h3>)}
            {subtitle !== undefined && (<span><TextField
                value = {subtitle}
                placeholder = 'Descripción'
                onChange = {onSubtitleChange}
                variant = 'resizable'
            /></span>)}
        </div>
    );
};

ExpandedCard.Header.Title.displayName = 'ExpandedCard.Header.Title';

ExpandedCard.Header.Title.propTypes = {
    /**
    * Título de la tarjeta.
    */
    title: PropTypes.string,
    /**
    * Subtítulo de la tarjeta.
    */
    subtitle: PropTypes.string,
    /**
    * ¿Está centrado el título de la tarjeta?
    */
    centered: PropTypes.bool,
};

ExpandedCard.Header.Title.defaultProps = {
    title: undefined,
    subtitle: undefined,
    centered: undefined,
};
