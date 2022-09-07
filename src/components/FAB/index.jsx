import PropTypes from 'prop-types';
import React, { forwardRef, useRef, useState } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Icon from '../Icon';
import './style.css';




/**
 * Botón de acción flotante.
 */
const FAB = forwardRef(function ({icon, text, small, color, fontColor, offset, __offset, onClick}, ref) {
    return (
        <>
            {!small && (
                <div
                    className={'component-fab-blankspace'}
                ></div>
            )}
            <button
                ref={ref}
                className={small?'component-fab-small':'component-fab'}
                style={{
                    backgroundColor: color,
                    '--bottom-offset': offset + 'rem',
                    '--offset': __offset + 'rem',
                }}
                onClick = {onClick}
            >
                {icon && (<Icon
                    name={icon}
                    color= {fontColor}
                />)}
                {text && (<span
                    style={{
                        color: fontColor,
                    }}>{text}</span>)}
            </button>
        </>
    );
});
FAB.displayName='FAB';
export default FAB;

FAB.propTypes = {
    /**
     * Nombre del icono del botón.
     */
    icon: PropTypes.string,
    /**
     * Texto del botón.
     */
    text: PropTypes.string,
    /**
     * ¿Debe usarse la variante pequeña del botón?
     */
    small: PropTypes.bool,
    /**
     * Color del botón.
     */
    color: PropTypes.string,
    /**
     * Color del contenido del botón.
     */
    fontColor: PropTypes.string,
    /**
     * Indica la distancia del botón con el borde inferior de la pantalla.
     */
    offset: PropTypes.number,
    /**
    * Indica la distancia de los botones de acción flotantes anidados.
    */
    __offset: PropTypes.number,
    /**
     * Evento llamado al accionar el botón.
     */
    onClick: PropTypes.func,
};

FAB.defaultProps = {
    icon: undefined,
    text: undefined,
    small: false,
    color: '#FFF2DF',
    fontColor: '#000000',
    offset: 0,
    __offset: 1,
    onClick: undefined,
};

/**
* Botón de acción con botones anidados.
*/
export function ComposedFAB({offset, actions, ...props}){
    const [expanded, setExpanded] = useState(false);
    const ref1 = useRef();
    const ref2 = useRef();

    useOnClickOutside( [ref1, ref2], () => setExpanded(false));
    return (
        <>
            <FAB
                {...props}
                offset ={offset}
                onClick = {() => setExpanded(!expanded)}
                icon = {expanded ? 'close' : props.icon}
                ref = {ref1}
            />
            <div
                className='component-composedFAB-container'
                style={{
                    '--bottom-offset': offset + 'rem',
                    '--offset': (4 + (expanded ? 0: -1)) + 'rem',
                    opacity: expanded ? 1 : 0,
                    transform: expanded ? 'scale(1)' : 'scale(0)',
                    marginRight: expanded ? '0' : '2.5rem',
                }}
                ref = {ref2}
            >
                {
                    actions.map((child, i) => (
                        <FAB
                            key={i}
                            {...child}
                            small
                            __offset={3.5 * i}
                            color= {props.color}
                            fontColor= {props.fontColor}
                        />
                    ))
                }
            </div>
        </>
    );
}

ComposedFAB.propTypes = {
    /**
     * Nombre del icono del botón.
     */
    icon: PropTypes.string,
    /**
     * Texto del botón.
     */
    text: PropTypes.string,
    /**
     * Debe usarse la variante pequeña del botón.
     */
    small: PropTypes.bool,
    /**
     * Color del botón.
     */
    color: PropTypes.string,
    /**
     * Color del contenido del botón.
     */
    fontColor: PropTypes.string,
    /**
     * Indica la distancia del botón con el borde inferior de la pantalla.
     */
    offset: PropTypes.number,
    /**
     * Botones anidados.
     */
    actions: PropTypes.array,
};

ComposedFAB.defaultProps = {
    icon: undefined,
    text: undefined,
    small: false,
    color: '#FFF2DF',
    fontColor: '#000000',
    offset: 0,
    actions: undefined,
};
