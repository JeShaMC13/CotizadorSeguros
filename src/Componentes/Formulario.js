import React, {useState} from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {obtenerDiferenciaYear, calcularMarca, obtenerPlan} from '../Helper'


const Campo = styled.div`
    display:flex;
    margin-bottom:1rem;
    align-items:center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display:block;
    width:100%;
    padding:1rem;
    border:1px solid #e1e1e1;
    --webkit-appearance:none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color:#00838F;
    font-size:16px;
    width:100%;
    padding:1rem;
    color:#fff;
    text-transform: uppercase;
    font-weight: bold;
    border:none;
    transition: background-color .3s ease;
    margin-top: 2rem;
    &:hover{
        background-color: #26C6DA;
        cursor:pointer;
    }
`;


const Error = styled.div`
    background-color: red;
    color:white;
    padding:1rem;
    width:100%;
    text-align:center;
    margin-bottom: 2rem;
`;

const Formulario = ({guardarResumen, guardarCargando}) => {

    const [datos, guardarDatos] = useState(
        {
            marca:'',
            year:'',
            plan:''
        }
    );

    //extraer los valores del state
    const {marca, year, plan} = datos;

    const obtenerInfoFormulario = e => {
        guardarDatos(
            {
                ...datos,
                [e.target.name] : e.target.value
            }
        )

    }

    const [error, guardarError] = useState(false);

    //cuando el susuario presiona submit
    const cotizarSeguro = (e) => {
        e.preventDefault();
        if(marca.trim() === '' || year.trim() === '' || plan.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);

        //obtener l direfencia de anios
        const diferencia = obtenerDiferenciaYear(year);

        //usa base de 2000
        let resultado = 2000;

        //por cada anio hay que restar el 3%
        resultado -= ((diferencia * 3) * resultado) /100;
        console.log(resultado);

        //Americano 15%
        //Asiatico 5%
        //Europeo 30%
        resultado = calcularMarca(marca) * resultado;
        console.log(resultado);

        //Basico aumenta 20%
        //Completo aumenta 50%
        const incrementoPlan =  obtenerPlan(plan);
        resultado =  parseFloat(incrementoPlan*resultado).toFixed(2);
        console.log(resultado);
        //Total
        
        guardarCargando(true);

        setTimeout(() => {
            guardarCargando(false);
            guardarResumen({
                cotizacion:Number(resultado),
                datos
            })
        }, 3000);
       

    }

    return ( 
        <form
            onSubmit={cotizarSeguro}
        >
            {error ? <Error> Todos los campos son obligatorios!</Error>: null }

            <Campo>
                <Label>Marca</Label>
                <Select
                    name = "marca"
                    value = {marca}
                    onChange = {obtenerInfoFormulario}
                >
                    <option value="">---Selecciones---</option>
                    <option value="americano">Americano</option>
                    <option value="asiatico">Asiatico</option>
                    <option value="europeo">Europeo</option>
                </Select>

            </Campo>
            <Campo>
                <Label>Anio</Label>
                <Select
                    name = "year"
                    value = {year}
                    onChange = {obtenerInfoFormulario}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>

            </Campo>
            <Campo>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange = {obtenerInfoFormulario}
                />Basico
                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange = {obtenerInfoFormulario}
                />Completo
            </Campo>
            <Boton type="submit">Cotizar</Boton>
        </form>

     );
}
 
Formulario.propTypes = {
    guardarResumen:  PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
}
export default Formulario;