import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {primerMayuscula} from '../Helper';;

const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: #FFF;
    margin-top: 1rem;
`;

const Resumen = ({datos}) => {
    const {marca, year, plan} = datos;

    if(marca==='' || year ==='' || plan === ''){
        return null;
    }
    return ( 
        <ContenedorResumen>
            <h2>Resumen de cotizacion</h2>
            <ul>
                <li>
                    Marca: {primerMayuscula(marca)}
                </li>
                <li>
                    Plan: {primerMayuscula(plan)}
                </li>
                <li>
                    Year: {primerMayuscula(year)}
                </li>
            </ul>
        </ContenedorResumen>
     );
}
 
Resumen.propTypes = {
    datos:  PropTypes.object.isRequired
}

export default Resumen;