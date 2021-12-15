
import Login from './pages/login';

import GestionarProyectos from './pages/GestionarProyectos';
import GestionarUsuarios from './pages/GestionarUsuarios';
<<<<<<< Updated upstream
=======
import RegistrarUsuario from './pages/RegistrarUsuario';
import GestionarInscripcion from './pages/gestionarInscripcion'
import Proyectos from './pages/Proyectos';
import AvancesProyectos from './pages/AvancesProyectos';
>>>>>>> Stashed changes
import './styles/App.css'
import RegistrarUsuario from './pages/RegistrarUsuario';
import GestionarProyectosLider from './pages/GestionarProyectosLider'
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

         <Route path='/GestionarProyectosLider'>
           <GestionarProyectosLider />
         </Route>

         <Route path='/gestionarInscripcion'>
          <GestionarInscripcion />
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


