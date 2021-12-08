
import Login from './pages/login';

import GestionarProyectos from './pages/GestionarProyectos';
import GestionarUsuarios from './pages/GestionarUsuarios';
import './styles/App.css'
import RegistrarUsuario from './pages/RegistrarUsuario';
// import PrivateRoute from './components/PrivateRoute';
//import { request, gql } from 'graphql-request'
import { request, GraphQLClient } from 'graphql-request'


import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  /*
  const query = gql`
  {getProjects {
    _id
    codigoProyecto
    nombre
    objGenerales
    objEspecificos
    presupuesto
    fInicio
    fFinal
    estadoProyecto
    fase
  }}
`*/

  const query = `
  {getProjects {
    _id
    codigoProyecto
    nombre
    objGenerales
    objEspecificos
    presupuesto
    fInicio
    fFinal
    estadoProyecto
    fase
  }}
`

//request('http://localhost:3001/api/obtenerProyectos', query).then((data) => console.log(data));
request('http://localhost:3001/api', query).then((data) => console.log(data))

  return (
       
    <div className="App">
      <Router>
        <Switch>

         <Route path='/login'>
          <Login />
         </Route>

         <Route path='/RegistrarUsuario'>
          <RegistrarUsuario/>
         </Route>
        
         
         <Route path='/GestionarProyectos'>
           <GestionarProyectos />
         </Route>

         <Route path='/GestionarUsuarios'>
          <GestionarUsuarios />
         </Route>

         <Route path='/'>
          <Login />
         </Route>

        </Switch>
      </Router>
       
    </div>
  
  );
}

export default App;


