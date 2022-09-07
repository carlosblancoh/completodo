import { animated, useSpring } from '@react-spring/web';
import PropTypes from 'prop-types';
import React from 'react';
import useMeasure from 'react-use-measure';
import usePrevious from '../../hooks/previous';
import { hexToRgb } from '../../utils';
import Icon from '../Icon';
import TextField from '../TextField';
import './style.css';



/**
 * Tarjeta.
 */
export default function Card({children, variant, color, stackable, pinned, dimmed, onClick}) {
    let textColor;
    //const opacity = 0.32;
    let backgroundColor;
    let lightOrDarkColor;
    const colorResult = hexToRgb(color ?? '#ffffff');
    if ((colorResult.r*0.299 + colorResult.g*0.587 + colorResult.b*0.114) > 186) {
        textColor = 'var(--text-primary)';
        lightOrDarkColor = 'light';

    } else {
        textColor = '#ffffff';
        lightOrDarkColor = 'dark';
    }
    if (variant === 'glass') {
        //backgroundColor = `rgba(${colorResult.r}, ${colorResult.g}, ${colorResult.b}, ${opacity})`;
    } else {
        backgroundColor = color;
    }
    let classes = [
        'component-card',
        `component-card-${variant}`,
    ];
    if (stackable) {
        classes.push('component-card-stackable');
    }
    if (lightOrDarkColor !== 'dark') {
        classes.push('component-card-lightColor');
    } else {
        classes.push('component-card-darkColor');
    }
    if (dimmed) {
        classes.push('component-card-dimmed');
    }

    return (
        <section
            className={classes.join(' ')}
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
            }}
            onClick={onClick}
        >
            {pinned && (
                <div className='component-card-pinned'>
                    <Icon
                        name='bookmark'
                        fill
                        size={1}
                        color={pinned || undefined}
                    />
                </div>
            )}

            {children}
        </section>
    );
}

Card.propTypes = {
    /**
    * Hijos para la composición del componente.
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
    /**
    * ¿Se puede acoplar a otras tarjetas?
    */
    stackable: PropTypes.bool,
    /**
    * ¿La tarjeta está fijada?
    */
    pinned: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    /**
    * ¿La tarjeta está desactivada?
    */
    dimmed: PropTypes.bool,
    /**
    * Evento llamado al hacer click.
    */
    onClick: PropTypes.func,
};

Card.defaultProps = {
    children: undefined,
    variant: 'plain',
    color: undefined,
    stackable: undefined,
    pinned: false,
    dimmed: undefined,
    onClick: undefined,
};

/**
* Zona superior de la tarjeta.
*/
Card.Header = function ({children, onClick}) {
    return (
        <header
            className={'component-card-header'}
            onClick={onClick}
        >
            {children}
        </header>
    );
};
Card.Header.displayName = 'Card.Header';

Card.Header.propTypes = {
    /**
    * Hijos para la composición del componente.
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    /**
    * Evento llamado al hacer click.
    */
    onClick: PropTypes.func,
};

Card.Header.defaultProps = {
    children: undefined,
    onClick: undefined,
};

/**
* Contenido de la tarjeta.
*/
Card.Body = function ({children, collapsed}) {
    const [ref, { height: viewHeight }] = useMeasure();
    const { height, opacity } = useSpring({
        from: { height: 0, opacity: 0 },
        to: {
            height: !collapsed ? viewHeight : 0,
            opacity: !collapsed ? 1 : 0,
        },
    });
    const previous = usePrevious(collapsed);
    return (
        <animated.main
            className={'component-card-body'}
            style={{
                opacity,
                height: !collapsed && !previous === !collapsed ? 'auto' : height,
                pointerEvents: collapsed ? 'none' : undefined,
                overflow: 'hidden',
            }}
        >
            <div style={{paddingTop: '0.2rem'}} ref={ref}>
                {children}
            </div>
        </animated.main>
    );
};
Card.Body.displayName = 'Card.Body';

Card.Body.propTypes = {
    /**
    * Hijos para el contenido del cuerpo.
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    /**
    * ¿La tarjeta muestra su contenido?
    */
    collapsed: PropTypes.bool,
};

Card.Body.defaultProps = {
    children: undefined,
    collapsed: undefined,
};

/**
* Zona superior izquierda de la tarjeta.
*/
// eslint-disable-next-line react/display-name, react/prop-types
Card.Header.Left = function ({children, onClick : onClickEvent}) {
    function onClick(event) {
        if (onClickEvent) {
            event.stopPropagation();
            onClickEvent();
        }
    }

    return (
        <div
            className={'component-card-header-left'}
            onClick = {onClick}
        >
            {children}
        </div>
    );
};

Card.Header.Left.displayName = 'Card.Header.Left';

Card.Header.Left.propTypes = {
    /**
    * Hijos para el contenido.
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    /**
    * Evento llamado al hacer click.
    */
    onClick: PropTypes.func,
};

Card.Header.Left.defaultProps = {
    children: undefined,
    onClick: undefined,
};

/**
* Zona superior derecha de la tarjeta.
*/
// eslint-disable-next-line react/display-name, react/prop-types
Card.Header.Right = function ({children, onClick : onClickEvent}) {

    function onClick(event) {
        if (onClickEvent) {
            event.stopPropagation();
            onClickEvent();
        }
    }

    return (
        <div
            className={'component-card-header-right'}
            onClick = {onClick}
        >
            {children}
        </div>
    );
};

Card.Header.Right.displayName = 'Card.Header.Right';

Card.Header.Right.propTypes = {
    /**
    * Hijos para el contenido.
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    /**
    * Evento llamado al hacer click.
    */
    onClick: PropTypes.func,
};

Card.Header.Right.defaultProps = {
    children: undefined,
    onClick: undefined,
};

/**
* Área de título de la tarjeta.
*/
// eslint-disable-next-line react/display-name, react/prop-types
Card.Header.Title = function ({title, subtitle, centered, onClick, onChange, editionDisabled}) {
    function onTitleChange(value) {
        onChange?.({
            title : value,
        });
    }

    if (editionDisabled) {
        return (
            <div
                className={'component-card-header-title'}
                style={{
                    textAlign: centered && 'center',
                    width: centered && '100%',
                }}
                onClick = {onClick}
            >
                {title !== undefined && (<h3>
                    {title}
                </h3>)}

                {subtitle && (<span>{subtitle}</span>)}
            </div>
        );
    } else {
        return (
            <div
                className={'component-card-header-title'}
                style={{
                    textAlign: centered && 'center',
                }}
                onClick = {onClick}
            >
                {title !== undefined && (<h3><TextField
                    value = {title}
                    onChange={onTitleChange}
                    variant = 'resizable'
                    placeholder = '(Sin título)'
                /></h3>)}

                {subtitle && (<span>{subtitle}</span>)}
            </div>
        );
    }
};

Card.Header.Title.displayName = 'Card.Header.Title';

Card.Header.Title.propTypes = {
    /**
    * Título de la tarjeta.
    */
    title: PropTypes.string,
    /**
    * Subtítulo de la tarjeta.
    */
    subtitle: PropTypes.string,
    /**
    * ¿Debe estar centrado el título?
    */
    centered: PropTypes.bool,
    /**
    * Evento llamado al hacer click.
    */
    onClick: PropTypes.func,
    /**
    * ¿Está deshabilitada la edición del título?
    */
    editionDisabled: PropTypes.bool,
};

Card.Header.Title.defaultProps = {
    title: undefined,
    subtitle: undefined,
    centered: undefined,
    onClick: undefined,
    editionDisabled: false,
};

/**
* Zona central de la tarjeta.
*/
Card.Middle = function ({children}) {
    return (
        <div
            className={'component-card-middle'}
        >
            {children}
        </div>
    );
};

Card.Middle.displayName = 'Card.Middle';

Card.Middle.propTypes = {
    /**
    * Hijos para el contenido.
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

Card.Middle.defaultProps = {
    children: undefined,
};
