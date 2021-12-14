
import Login from './pages/login';

import GestionarProyectos from './pages/GestionarProyectos';
import GestionarUsuarios from './pages/GestionarUsuarios';
import RegistrarUsuario from './pages/RegistrarUsuario';
import Proyectos from './pages/Proyectos';
import AvancesProyectos from './pages/AvancesProyectos';
import './styles/App.css'
// import PrivateRoute from './components/PrivateRoute';



import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {





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

         <Route path='/Proyectos'>
          <Proyectos />
         </Route>

         <Route path='/Avances'>
          <AvancesProyectos />
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


