import axios from 'axios';

/*-------Proyectos------*/
export const obtenerProyectos = async (successCallback, errorCallback) => {
  const options = { method: 'GET',
  url: 'http://localhost:3001/proyectos/' };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const registrarProyectos = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:3001/proyectos/create',
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarProyectos = async ( data, successCallback, errorCallback) => {
  const options = {
    method: 'PATCH',
    url: 'http://localhost:3001/proyectos/update/',
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

/*---------USUARIOS-------------*/

export const obtenerUsuarios = async (successCallback, errorCallback) => {
  const options = { method: 'GET',
  url: 'http://localhost:3001/usuarios/' };
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

