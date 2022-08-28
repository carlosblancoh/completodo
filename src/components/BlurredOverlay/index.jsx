import PropTypes from 'prop-types';
import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import './style.css';


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
    visible: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    onClick: PropTypes.func,
    variant: PropTypes.string,
};

BlurredOverlay.defaultProps = {
    visible: true,
    children: undefined,
    onClick: undefined,
    variant: 'popup',
};
