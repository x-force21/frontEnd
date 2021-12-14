import axios from 'axios';
import { request, GraphQLClient } from 'graphql-request';

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
await request('http://localhost:3001/api', query).then(successCallback);

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
    "presupuesto": 80000,
    "fInicio": "2021-12-01",
    "fFinal": "2021-12-08",
    "nombreLider": data.lider,
    "documentoLider": "123456789",//data.documentoLider,
    "estadoProyecto" : data.estadoProyecto
  }
}
  
  await request('http://localhost:3001/api', mutation, varInputProject).then(successCallback);
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

  await request('http://localhost:3001/api', mutation, varInputProject).then(successCallback);
};

export const obtenerProyectosUser = async (successCallback, errorCallback) => {

  const query = `
  {getProjects {
    _id
    codigoProyecto
    nombre
    nombreLider
    estadoProyecto
  }}
`
await request('http://localhost:3001/api', query).then(successCallback);
};

/*---------Usuarios-------------*/

export const obtenerUsuarios = async (successCallback, errorCallback) => {

  const query = `
  {getUsers {
    _id
    nombre
    apellido
    email
    contrasena
    documentType
    documentId
    rol
    estado
  }}
`
await request('http://localhost:3001/api', query).then(successCallback);
}; 

export const registrarUsuarios = async (data, successCallback, errorCallback) => {
  const mutation = `mutation
  registerUser($UserInput:UserInput!){   
    registerUser(input: $UserInput) {
      nombre
      apellido
      email
      contrasena
      documentType
      documentId
      rol
      estado
    }
  }`

  let varInputUser =
  {
  "UserInput": {
    "nombre": "Hola",
    "apellido": "Mundo",
    "email": "hola@mundo.com",
    "contrasena": "homu123*",
    "documentType": "CC",
    "documentId": "123AA4566",
    "rol": "estudiante",
    "estado": "pendiente",
  }
}
  
  await request('http://localhost:3001/api', mutation, varInputUser).then(successCallback);
};


export const editarUsuarios = async ( data, successCallback, errorCallback) => {
  const mutation = `mutation
  editUserInfo($userEditInput:UserEditInput!){   
    editUserInfo((input: $userEditInput) {
      _id
      nombre
      apellido
      email
      contrasena
      documentId
      estado
    }
  }`
  
  let varuserEditInput =
    {
      "userEditInput": {
      "_id": data._id,
      "nombre": "",
      "apellido": "",
      "email": "",
      "contrasena": "",
      "documentId": "",
      "estado": "",
      
    }
  }
  await request('http://localhost:3001/api', mutation, varuserEditInput).then(successCallback);
};

export const editUserState = async ( data, successCallback, errorCallback) => {
  const mutation = `mutation
  editUserState($userStateInput:UserStateInput!){   
    editUserState((input: $userStateInput) {
      rol
      estado
    }
  }`
  
  let varUserStateInput =
    {
      "rol": "Estudiante",
      "estado": "Autorizado",
      
    }

  await request('http://localhost:3001/api', mutation, varUserStateInput).then(successCallback);
};

/*---------Avances-------------*/

export const inscriptionProject = async ( data, successCallback, errorCallback) => {
  const mutation = `mutation
  inscriptionProject($inscriptionsInput:InscriptionsInput!){   
    inscriptionProject((input: $inscriptionsInput) {
      UserID
      codigoProyecto
      estadoInscription
      fechaIngreso
      fechaEgreso
    }
  }`
  
  let varinscriptionsInput =
    {
      "inscriptionsInput": {
      "_id": data._id,
      "codigoProyecto": "ING0001",
      "estadoInscription": "",
    }
  }
  await request('http://localhost:3001/api', mutation, varinscriptionsInput).then(successCallback);
};