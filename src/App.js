import React, {useState} from 'react';
import Header from './Componentes/Header';
import styled from '@emotion/styled';
import Formulario from './Componentes/Formulario';
import Resumen from './Componentes/Resumen';
import Resultado from './Componentes/Resultado';
import Spinner from './Componentes/Spinner';
const Contenedor = styled.div`
  max-width:600px;
  margin:0 auto;
`;

const ContenedorFormulario = styled.div`
  background-color:#FFF;
  padding:3rem;
`;

function App() {

  const [resumen, guardarResumen] = useState({
    cotizacion:0,
    datos:{
      marca: '',
      year:'',
      plan:''
    }
  });

  const [cargando, guardarCargando] = useState(false);

  //extraemos datos
  const {cotizacion, datos } = resumen;

  return (
    <Contenedor>
      <Header
        titulo = 'Cotizador de seguros'
      />
        <ContenedorFormulario>
        <Formulario
          guardarResumen = {guardarResumen}
          guardarCargando = {guardarCargando}
        />
        {cargando? <Spinner/>: null }
        
        <Resumen
          datos = {datos}
        />

        {!cargando ?
        <Resultado
          cotizacion = {cotizacion}
        />:null
        }
      </ContenedorFormulario>
    </Contenedor>

   
  );
}

export default App;
