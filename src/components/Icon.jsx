import PropTypes from 'prop-types';
import React from 'react';

/**
 * Icono de [Material Design](https://fonts.google.com/icons).
 */
export default function Icon({
    name,
    fill,
    weight,
    grade,
    size,
    color,
}) {
    let fillValue = 0;
    if (fill) {
        fillValue = 1;
    }
    const variation = `'FILL' ${fillValue}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${size * 24}`;
    return (
        <span
            className='material-symbols-rounded'
            style={{
                fontVariationSettings: variation,
                color: color,
                fontSize: `${1.5 * size}rem`,
                userSelect: 'none',
            }}
        >
            {name}
        </span>
    );
}

Icon.propTypes = {
    /**
     * Nombre del icono.
     */
    name: PropTypes.string.isRequired,
    /**
     * ¿Debe estar relleno?
     */
    fill: PropTypes.bool,
    /**
    * Grosor del icono.
    */
    weight: PropTypes.number,
    /**
    * Grosor granular del icono.
    */
    grade: PropTypes.number,
    /**
    * Tamaño del icono.
    */
    size: PropTypes.number,
    /**
    * Color del icono.
    */
    color: PropTypes.string,
};

Icon.defaultProps = {
    fill: false,
    weight: 300,
    grade: 0,
    size: 1,
    color: undefined,
};
