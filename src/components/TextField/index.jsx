import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import Icon from '../Icon';
import './style.css';
import autosize from 'autosize';




/**
 * Campo de texto
 */

export default function TextField({placeholder, value, onChange: onChangeEvent, variant, isDisabled}) {
    const [focused, setFocused] = useState(false);
    const textarea = useRef(null);
    const onBlurTimeout = useRef(null);

    useEffect(() => {
        autosize(textarea.current);
    }, []);

    useEffect(() => {
        return () => {
            if (onBlurTimeout.current !== null) {
                window.clearTimeout(onBlurTimeout.current);
            }
        };
    }, [onBlurTimeout]);

    useEffect(() => {
        autosize.update(textarea.current);
    }, [value, focused]);

    function onFocus(event) {
        if (event.target.value.length > 0) {
            setFocused(true);
        }
    }

    function onChange(event) {
        if (onChangeEvent) {
            onChangeEvent(event.target.value);
        }
        if (event.target.value.length > 0) {
            setFocused(true);
        } else {
            setFocused(false);
        }
    }

    function onBlur() {
        //el botón de "limpiar campo" tarda en desaparecer para que el click se
        //haga correctamente sobre él y pueda no propagarse.
        onBlurTimeout.current = window.setTimeout(()=>{
            setFocused(false);
            onBlurTimeout.current = null;
        }, 100);
    }

    function onReset() {
        onChangeEvent('');
    }

    function onClick(event) {
        event.stopPropagation();
        event.cancelBubble = true;
    }

    let classes = [
        'component-textField',
        `component-textField-${variant}`,
    ];

    let inputType;
    switch(variant){
    case 'default':
        inputType = 'text';
        break;
    case 'noBackground':
        inputType = 'text';
        break;
    case 'search':
        inputType = 'search';
        break;
    default:
        inputType = variant;
        break;

    }

    if (variant == 'resizable') {
        return (
            <div className={'component-textField-form'}>
                <span className={'component-textField-container'}>
                    <span
                        style={{
                            paddingRight: focused && '3rem',
                        }}
                        className={'component-textField-space'}
                        aria-hidden="true"
                    >
                        {(value==='')?placeholder:value}.
                    </span>
                    <textarea
                        style={{
                            width: focused && 'calc(100% - 3rem)',
                        }}
                        type={inputType}
                        className={classes.join(' ')}
                        placeholder={placeholder}
                        onFocus={onFocus}
                        onChange={onChange}
                        onBlur={onBlur}
                        onClick={onClick}
                        value={value}
                        ref={textarea}
                        disabled={isDisabled}
                    />
                </span>
                <button
                    style={{
                        display: !focused && 'none',
                    }}
                    type='reset'
                    className={'component-textField-textClear'}
                    onMouseDown={onReset}
                    onClick={onClick}
                    tabIndex={-1}
                >
                    <Icon name='cancel' size={1}/>
                </button>
            </div>
        );
    } else {
        return (
            <div className={'component-textField-form'}>
                <input
                    type={inputType}
                    className={classes.join(' ')}
                    placeholder={placeholder}
                    onFocus={onFocus}
                    onChange={onChange}
                    onBlur={onBlur}
                    onClick={onClick}
                    value={value}
                    disabled={isDisabled}
                />
                <button
                    style={{
                        display: !focused && 'none',
                    }}
                    type='reset'
                    className={'component-textField-textClear'}
                    onMouseDown={onReset}
                    onClick={onClick}
                    tabIndex={-1}
                >
                    <Icon name='cancel' size={1}/>
                </button>
            </div>
        );
    }
}
TextField.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    variant: PropTypes.oneOf(['default', 'noBackground', 'search', 'email', 'password', 'resizable']),
    isDisabled: PropTypes.bool,
};

TextField.defaultProps = {
    placeholder: undefined,
    value: undefined,
    onChange: undefined,
    variant: 'default',
    isDisabled: false,
};
