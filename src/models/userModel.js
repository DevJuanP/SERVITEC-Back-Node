import { getDB } from '../config/db.js';
import { ObjectId } from 'mongodb';


const collectionName = 'usuarios';

export const findUserByEmail = async (correo) => {
  const db = getDB();
  return await db.collection(collectionName).findOne({ correo });
};

export const createUser = async (usuarioData) => {
  const db = getDB();
  const result = await db.collection(collectionName).insertOne(usuarioData);
  return result;
};

export const getAllUsers = async () => {
  const db = getDB();
  // El .project({ password: 0 }) hace que nos traiga todo MENOS la contraseña encriptada
  return await db.collection('usuarios').find()/*.project({ password: 0 })*/.toArray();
};

export const findUserById = async (id) => {
  const db = getDB();
  return await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
};