import { Link } from "react-router-dom";


function Login() {
  
  return (
    <div>
        <div className="container">
            <div className="divlogo"> 
               <h1>X-Force</h1> 
                <div className="divinternopiedepagina">
                <p>Equipo X-Force/Grupo 4-5-6/Ciclo4/UdeA/MisionTic 2022</p>
                </div>
            </div>  

            <div className="divlogin">
                <h1>Bienvenido<br></br>a tu plataforma de proyectos</h1>
                 <div>  
                    <Link to='/RegistrarUsuario'><button className="botonlogin" type="submit">Regístrate</button><br/></Link>
                    <h3 id="h3">- Ó si ya tienes cuenta -</h3>
                  </div>
                  
            </div>
         </div>
    </div>
  );
}
export default Login;