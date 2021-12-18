import axios from 'axios';
import { request, GraphQLClient } from 'graphql-request';
const backendAppDomain = 'https://xforceappbhk.herokuapp.com';
/*-------Proyectos------*/

export const obtenerProyectoFiltrado = async (successCallback, errorCallback) => {

  const query =` {
	getProjectsByFilter(leaderDocument:"1001"){
    _id
    nombre
    nombreLider
    estadoProyecto
    fase
    objGenerales
    objEspecificos
    presupuesto
  }
  }`

await request(`${backendAppDomain}/api`, query).then(successCallback);

};

/*-------Proyectos------*/
export const obtenerProyectos = async (successCallback, errorCallback) => {

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
    nombreLider
    documentoLider
  }}
`
await request(`${backendAppDomain}/api`, query).then(successCallback);

};

export const registrarProyectos = async (data, successCallback, errorCallback) => {
  const mutation = `mutation
  registerProject($projectInput:ProjectInput!){   
    registerProject(input: $projectInput) {
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
    }
  }`

  let varInputProject =
  {
  "projectInput": {
    "codigoProyecto": data.codigoProyecto,
    "nombre": data.nombre,
    "objGenerales": "mejorar cosas",
    "objEspecificos": "mejorar una cosa",
    "presupuesto": Number(data.presupuesto),
    "fInicio": data.fInicio,
    "fFinal": data.fFinal,
    "nombreLider": data.lider,
    "documentoLider": data.documentoLider
  }
}
  
  await request(`${backendAppDomain}/api`, mutation, varInputProject).then(successCallback);
};

export const editarProyectos = async ( data, successCallback, errorCallback) => {

  const mutation = `mutation
  editProject($idProject:ID!, $projectStatus:EditProjectInput){   
    editProject(_id:$idProject, input: $projectStatus) {
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
    }
  }`

  let varInputProject =
  {"idProject":data._id,
  "projectStatus": {
  "estadoProyecto": data.estadoProyecto,
  "fase":data.fase
  }
  }

  await request(`${backendAppDomain}/api`, mutation, varInputProject).then(successCallback);
};

export const editarProyectosLider = async ( data, successCallback, errorCallback) => {

  const mutation = `mutation
  editProject($idProject:ID!, $projectStatus:EditProjectInput){   
    editProject(_id:$idProject, input: $projectStatus) {
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
    }
  }`

  let varInputProject =
  {"idProject":data._id,
  "projectStatus": {
  "estadoProyecto": data.estadoProyecto,
  "fase":data.fase,
  "objGenerales": data.objGenerales,
  "objEspecificos": data.objEspecificos,
  "presupuesto":Number(data.presupuesto)
  }
  }

  await request(`${backendAppDomain}/api`, mutation, varInputProject).then(successCallback);
};
/*---------USUARIOS-------------*/

export const obtenerUsuariosFiltrado = async (successCallback, errorCallback) => {

  const query =`
  getUsers {
    _id
    nombre
    apellido
    email
    contrasena
    documentType
    documentId
    rol
    estado
	}
  }
  `

await request(`${backendAppDomain}/api`, query).then(successCallback);

};


export const obtenerUsuarios = async (successCallback, errorCallback) => {
  const options = { method: 'GET',
  url: `${backendAppDomain}/api/usuarios/` };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const registrarUsuarios = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:3001/usuarios/create',
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarUsuarios = async ( data, successCallback, errorCallback) => {
  const options = {
    method: 'PATCH',
    url: 'http://localhost:3001/usuarios/update/',
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

