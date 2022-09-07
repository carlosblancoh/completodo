import PropTypes from 'prop-types';
import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import './style.css';

/**
 * Capa con transparencia que cubre la pantalla.
 */
export default function BlurredOverlay({visible, children, onClick, variant}) {
    const ref = useRef(null);
    useEffect(() => {
        const body =  document.querySelector('body');
        body.style.overflow = 'hidden';
        return () => {
            body.style.overflow = 'auto';
        };
    });
    useEffect(()=>{
        ref.current.style.animation = 'none';
        ref.current.offsetHeight;
        ref.current.style.animation = null;
        for (const child of ref.current.childNodes) {
            child.style.animation = 'none';
            child.offsetHeight;
            child.style.animation = null;
        }
    }, [visible]);
    const classes = [
        `component-blurredOverlay-${variant}`,
    ];
    if (visible) {
        classes.push(`component-blurredOverlay-${variant}-visible`);
    } else {
        classes.push(`component-blurredOverlay-${variant}-hidden`);
    }
    return(
        <div
            ref={ref}
            className={classes.join(' ')}
            onClick= {onClick}
            onScroll={event => event.stopPropagation()}
            onTouchMove={event => event.preventDefault()}
        >
            {children}
        </div>
    );
}

BlurredOverlay.propTypes = {
    /**
    * ¿Debe mostrarse la capa?.
    */
    visible: PropTypes.bool,
    /**
    * Hijos para el contenido sobre la capa.
    */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    /**
    * Evento llamado al hacer click.
    */
    onClick: PropTypes.func,
    /**
    * Tipo de capa.
    */
    variant: PropTypes.string,
};

BlurredOverlay.defaultProps = {
    visible: true,
    children: undefined,
    onClick: undefined,
    variant: 'popup',
};
