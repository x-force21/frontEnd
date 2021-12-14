import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { obtenerProyectos, registrarInscripcion, editarProyectos} from '../utils/api';
import { nanoid } from 'nanoid';


const Proyectos = () => {

    const [proyectos, setProyectos] = useState([]);
    const [mostrarTablaProyectos, setMostrarTablaProyectos] = useState(true);
    const [textoBoton,setTextoBoton] = useState('Inscripcion');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true); 
    
    
    useEffect(() => {
        console.log('consulta', ejecutarConsulta);
        if (ejecutarConsulta) {
            obtenerProyectos((response) => {
                console.log('la respuesta que se recibio fue', response);
                setProyectos(response.getProjects);
            },
            (error) => {
                console.error('Salio un error:', error);
            }
            );
            setEjecutarConsulta(false); 
        }
    }, [ejecutarConsulta]);
    
        
    return (
        <div>
            <div>
                <button
                onClick={() => {
                    setMostrarTablaProyectos(!mostrarTablaProyectos)
                }}
                className="botonCrear">                
                {textoBoton}
                </button>
            </div>

            {mostrarTablaProyectos ? (
            <TablaProyectos listaProyectos={proyectos} setEjecutarConsulta={setEjecutarConsulta}/>
            ) : (
                <RegistrarInscripcion
                    setMostrarTablaProyectos={setMostrarTablaProyectos}
                    listaProyectos={proyectos}
                    setProyectos={setProyectos}/>
                )}
            <ToastContainer position='bottom-center' autoClose={5000} />
        </div>
    );
};    
/*------------ Tabla Proyectos --------------*/


const TablaProyectos = ({ listaProyectos, setEjecutarConsulta }) => {
    const [busqueda, setBusqueda] = useState('');
    const [proyectosFiltrados, setProyectosFiltrados] = useState(listaProyectos);

    // ******** AQUÍ VA el useEffect de filtro y búsqueda *********

    useEffect(() => {
        setProyectosFiltrados(
          listaProyectos.filter((elemento) => {
            return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
          })
        );

    }, [busqueda, listaProyectos]);
    
    return (
        <div>
            <Header/>
            <div className="textosInicioSeccion">
            <div className="tituloSeccion">Mis Proyectos</div>
            <div className="descripcionSeccion">Aquí encuentras los proyectos y podras registrar avances.</div>
        </div>   
            <section>    
                <ul className="posicionBuscador"> 
                    <li>
                        <div className="label">Ingresa el ID del Proyecto:</div>
                        <input id="busqueda" type="text" value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Ingresa el dato"
                        />
                    </li>
                </ul>
                <div className="productsTable">
                    <table summary="Proyectos registrados">
                        <caption></caption>
                            <thead>
                            <tr>
                                <th scope="col">ID Proyecto</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Lider</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Avances</th>
                                <th></th>
                            </tr>
                            </thead>
                        <tbody>
                            {proyectosFiltrados.map((proyecto) => {   
                            return (
                                <FilaProyecto
                                    key={nanoid()}
                                    proyecto={proyecto}
                                    setEjecutarConsulta={setEjecutarConsulta}
                                    />
                                );                   
                            })}
                        </tbody>
                    </table>
                </div>                
            </section>
            <Footer/>
        </div>
    );
};


/*------------ Fila Proyectos - donde se pueden editar --------------*/

const FilaProyecto = ({ proyecto, setEjecutarConsulta }) => {
    
    const [edit, setEdit] = useState(false);
    const [infoNuevoProyecto, setInfoNuevoProyecto] = useState(
        {
            codigoProyecto: proyecto.codigoProyecto,
            nombre: proyecto.nombre,
            nombreLider: proyecto.nombreLider,
            estadoProyecto: proyecto.estadoProyecto,
        }
    );

    const actualizarProyecto = async () => {
    //enviar la info al back y se define el método POST con import axios de utils/api
    //async trabaja con await axios
    //enviar la info al back
    
        await editarProyectos(
            {    
                _id: proyecto._id,
                codigoProyecto: infoNuevoProyecto.codigoProyecto,
                nombre: infoNuevoProyecto.nombre,
                nombreLider: infoNuevoProyecto.nombreLider,
                estadoProyecto: infoNuevoProyecto.estadoProyecto,
            },
            (response) => {
                toast.success('Proyecto editado con éxito');
                setEdit(false);
                setEjecutarConsulta(true);
            },
            (error) => {
                toast.error('Error editando el Proyecto');
                console.error(error);
            }
        );
    };

    /******* Código con -input- para editar los Proyecto **********/

    return (
        <tr>
            {edit ? (
            <>
                <td>{infoNuevoProyecto.codigoProyecto}
                </td>
                <td>
                    <select name="descripcion" className="estilosCampos"
                        defaultValue={infoNuevoProyecto.nombre}
                        onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, descripcion: e.target.value })}>
                        
                    </select>
                </td>
                <td>
                    
                    <input name="lider" className="campoLider"
                        defaultValue={infoNuevoProyecto.nombreLider}
                        //required
                        //controlar el componente con un solo estado (e = elemento que entra)
                        //(...)spread operator
                        onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, lider: e.target.value })} >
                    </input>    
                </td>
                <td>
                    <select name="estado" className="estilosCampos"
                        //required
                        defaultValue={infoNuevoProyecto.estadoProyecto}
                        onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, estado: e.target.value })}>
                        <option disabled value={0}> Selecciona un estado</option>
                        <option>Activo</option>
                        <option>Inactivo</option>
                    </select>
                </td>
                <td>
                    <button className="checkButton" onClick={actualizarProyecto}>
                    <span className="material-icons">check</span></button> 
                </td>
                <td>
                    <button className="cancelButton" onClick={()=>setEdit(!edit)}> 
                    <span className="material-icons">cancel</span>
                    </button>
                </td>
                </>
            ) : (
                <>
                <td>{proyecto.codigoProyecto}</td>
                <td>{proyecto.nombre}</td>
                <td>{proyecto.nombreLider}</td>
                <td>{proyecto.estadoProyecto}</td>
                <td><button className="checkButton" onClick={()=>RegistrarInscripcion(true)}> 
                        <span className="material-icon">Agregar</span></button></td>
                    <td></td> 
            </>
            )
            }
        </tr>
    );
};
               

/*------------ FORMULARIO Crear Nuevos proyectos --------------*/

const RegistrarInscripcion = ({ setMostrarTablaProyectos}) => {
    const form = useRef(null);

    //async trabaja con await axios    
    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
        

        const nuevoInscripcion = {};
        fd.forEach((value, key) => {
            nuevoInscripcion[key] = value;
        });
        //se define el método POST y la url 3001 (AQUÍ SE MUESTRAN DATOS)
        await registrarInscripcion(
            {
                userID: nuevoInscripcion.userID,
                codigoProyecto: nuevoInscripcion.codigoProyecto,
                inscripcionStatus: nuevoInscripcion.inscripcionStatus,
                fechaIngreso: nuevoInscripcion.fechaIngreso, 
                fechaEgreso: nuevoInscripcion.fechaEgreso,
            },
            (response) => {
              console.log(response.data);
              toast.success('Te has registrado con exito en tu nuevo proyecto');
            },
            (error) => {
              console.error(error);
              toast.error('Error generando la inscripcion');
            }
          );
      
        setMostrarTablaProyectos(true);
    };
      
    
    return(
        <div>
            <Header/>
            <div className="textosInicioSeccion">
            <div className="tituloSeccion">
                <span>Agregar nueva Inscripcion</span>
                    </div>
            <div className="descripcionSeccion">Ingresa los datos del proyecto en el que deseas participar</div>
        </div>
            <div className="contenedorFormulario">
            <form ref={form} onSubmit={submitForm} className='flex flex-col'>
                
                
                <label htmlFor="UserID">User ID
                    <input type="text" name="userID"
                    placeholder="Ingresa user ID" required/>
                    </label>
                
                    <label htmlFor="codigoProyecto">Codigo del Proyecto
                    <input type="text" name="codigoProyecto"
                    placeholder="Ingresa el codigo del proyecto" required/>
                    </label>

                    <input id="inscripcionStatus" type="hidden" name="inscripcionStatus" value = "null" required/>
                    <input id="fechaIngreso" type="hidden" name="fechaIngreso" value = "null" required/>
                    <input id="fechaEgreso" type="hidden" name="fechaEgreso" value = "null" required/>

                <button type="submit" className="botonGuardarProyecto"> Guardar nuevo Proyecto
                </button>
            </form>
            </div>
        <Footer/>
    </div>
    );
};

export default Proyectos;