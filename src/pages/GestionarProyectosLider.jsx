import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { obtenerProyectoFiltrado, registrarProyectos, editarProyectosLider } from '../utils/api';
import { nanoid } from 'nanoid';


const GestionarProyectosLider = () => {

    const [proyectos, setProyectos] = useState([]);
    const [mostrarTablaProyectos, setMostrarTablaProyectos] = useState(true);
    const [textoBoton,setTextoBoton] = useState('Crear nuevo Proyecto');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
    
    
    useEffect(() => {
        console.log('consulta', ejecutarConsulta);
        if (ejecutarConsulta) {
            obtenerProyectoFiltrado((response) => {
                console.log('la respuesta que se recibio fue', response);
                setProyectos(response.getProjectsByFilter);
            },
            (error) => {
                console.error('Salio un error:', error);
            }
            );
            setEjecutarConsulta(false); 
        }
    }, [ejecutarConsulta]);
    

    //obtener lista desde el back 
    useEffect(() => {
        if (mostrarTablaProyectos) {
            setEjecutarConsulta(true);
        }
    }, [mostrarTablaProyectos]);

    useEffect(() => {
        if (mostrarTablaProyectos) {
            setTextoBoton('Crear nuevo Proyecto');
        } else {   
            setTextoBoton('Volver a Gestionar Proyectos');
            //setColorBoton();
        }
    }, [mostrarTablaProyectos]);

        
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
                <RegistrarProyectos
                    setMostrarTablaProyectos={setMostrarTablaProyectos}
                    listaProyetcos={proyectos}
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
            <div className="tituloSeccion">Gestionar proyectos</div>
            <div className="descripcionSeccion">Aquí encuentras los proyectos, los actualizas o agregas nuevos.</div>
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
                                <th scope="col" className="estilo-id-proy">ID Proyecto</th>
                                <th scope="col" className="estilosCampo2">Nombre</th>
                                <th scope="col" className="estilosCampo2">Lider</th>
                                <th scope="col" className="estado">Presupuesto</th>
                                <th scope="col" className="estado">Estado</th>
                                <th scope="col" className="estado">Fase</th>
                                <th scope="col" className="estado">Objetivos generales</th>
                                <th scope="col" className="estado">Objetivos espec&iacute;ficos</th>
                                <th scope="col" className="acciones">Acción</th>
                                <th className="acciones"></th>
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
            fase:proyecto.fase,
            objGenerales: proyecto.objGenerales,
            objEspecificos: proyecto.objEspecificos,
            presupuesto: proyecto.presupuesto
        }
    );

    const actualizarProyecto = async () => {
    //enviar la info al back y se define el método POST con import axios de utils/api
    //async trabaja con await axios
    //enviar la info al back
    
        await editarProyectosLider(
            {    
                _id: proyecto._id,
                codigoProyecto: infoNuevoProyecto.codigoProyecto,
                nombre: infoNuevoProyecto.nombre,
                nombreLider: infoNuevoProyecto.nombreLider,
                estadoProyecto: infoNuevoProyecto.estadoProyecto,
                fase:infoNuevoProyecto.fase,
                objGenerales: infoNuevoProyecto.objGenerales,
                objEspecificos: infoNuevoProyecto.objEspecificos,
                presupuesto: infoNuevoProyecto.presupuesto
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
                    <td className="estilosCampos">
                        <input name="nombre" 
                            defaultValue={infoNuevoProyecto.nombre}
                            onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, descripcion: e.target.value })}>

                        </input>
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
                    <td >
                        <input name="presupuesto"  className="presupuesto"
                            defaultValue={infoNuevoProyecto.presupuesto}
                            onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, presupuesto: e.target.value })}>

                        </input>
                    </td>
                    <td>
                        <select name="estado"   className="selector-edicion"
                            //required
                            defaultValue={infoNuevoProyecto.estadoProyecto}
                            onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, estadoProyecto: e.target.value })}>
                            <option disabled value={0}> Selecciona un estado</option>
                            <option>Activo</option>
                            <option>Inactivo</option>
                        </select>
                    </td>
                    <td>
                        <select name="fase" className="selector-edicion"
                            //required
                            defaultValue={infoNuevoProyecto.fase}
                            onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, fase: e.target.value })}>
                            <option disabled value={0}> Selecciona una fase</option>
                            <option>Iniciado</option>
                            <option>En desarrollo</option>
                            <option>Terminado</option>
                        </select>
                    </td>
                    <td  className="justify">

                        <textarea name="objGenerales" className="objetivos" 
                            defaultValue={infoNuevoProyecto.objGenerales}
                            onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, objGenerales: e.target.value })} >
                        </textarea>
                        </td>
                    <td>
                    <textarea  name="objEspecificos" className="objetivos"
                        defaultValue={infoNuevoProyecto.objEspecificos}
                        onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, objEspecificos: e.target.value })} >
                    </textarea >
                    </td>
                    <td>
                        <button className="checkButton" onClick={actualizarProyecto}>
                            <span className="material-icons">check</span></button>
                    </td>
                    <td>
                        <button className="cancelButton" onClick={() => setEdit(!edit)}>
                            <span className="material-icons">cancel</span>
                        </button>
                    </td>
                </>
            ) : (
                <>
                    <td>{proyecto.codigoProyecto}</td>
                    <td>{proyecto.nombre}</td>
                    <td>{proyecto.nombreLider}</td>
                    <td>{proyecto.presupuesto}</td>
                    <td><label className={proyecto.estadoProyecto === 'Activo' ? 'badgeAvailable' : 'badgeNotAvailable'}>
                        {proyecto.estadoProyecto}</label></td>
                    <td> {proyecto.fase}</td>
                    <td> {proyecto.objGenerales}</td>
                    <td> {proyecto.objEspecificos}</td>
                    <td><button className="editButton" onClick={() => setEdit(true)}>
                        <span className="material-icons">edit</span>
                    </button>
                </td>
                <td></td>
            </>
            )}
            
        </tr>
    );
};
               

/*------------ FORMULARIO Crear Nuevos proyectos --------------*/

const RegistrarProyectos = ({ setMostrarTablaProyectos, listaProyectos, setProyectos}) => {
    const form = useRef(null);

    //async trabaja con await axios    
    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
        

        const nuevoProyecto = {};
        fd.forEach((value, key) => {
            nuevoProyecto[key] = value;
        });
        //se define el método POST y la url 3001 (AQUÍ SE MUESTRAN DATOS)
        await registrarProyectos(
            {
                codigoProyecto: nuevoProyecto.idProyecto,
                nombre: nuevoProyecto.descripcion,
                lider: nuevoProyecto.lider,
                estadoProyecto: nuevoProyecto.estado,
            },
            (response) => {
              console.log(response.data);
              toast.success('Nuevo proyecto agregado con éxito');
              
            },
            (error) => {
              console.error(error);
              toast.error('Error agregando el proyecto');
            }
          );
      
        setMostrarTablaProyectos(true);
    };
      
    
    return(
        <div>
            <Header/>
            <div className="textosInicioSeccion">
            <div className="tituloSeccion">
                <span>Agregar nuevo Proyecto</span>
                    </div>
            <div className="descripcionSeccion">Ingresa los datos del nuevo Proyecto.</div>
        </div>
            <div className="contenedorFormulario">
            <form ref={form} onSubmit={submitForm} className='flex flex-col'>

                <label htmlFor="id">ID de Proyecto
                <input type="number" name="idProyecto"
                placeholder="Ejemplo: 0001" required/>
                </label>
            
                <label htmlFor="descripcionProyecto">Descripción del Proyecto
                <input type= "text" name="descripcion"  ></input>
                </label>

                <label htmlFor="liderProyecto">lider Proyecto
                <input type= "text" name="lider" ></input>
                </label>
            
                <label htmlFor="estadoProyecto">Estado del Proyecto
                    <select name="estado" required defaultValue={0} >
                        <option disabled value={0}> Selecciona un estado</option>
                        <option>Activo</option>
                        <option>Inactivo</option>
                    </select>
                </label>
                <button type="submit" className="botonGuardarUsuario"> Guardar nuevo Proyecto
                </button>
            </form>
            </div>
        <Footer/>
    </div>
    );
};

export default GestionarProyectosLider;
