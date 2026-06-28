import { getDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

const collectionName = 'tiposCitas';

export const getTypeCita = async () => {
  const db = getDB();
  return await db.collection(collectionName).find().toArray();
};

export const postCita = async ({ clienteId, asesorId, tipoCitaId, estado, fechaCreacion }) => {
  const db = getDB();
  const nuevaCita = {
    clienteId: new ObjectId(clienteId),
    asesorId:  new ObjectId(asesorId),
    tipoCitaId,
    estado,
    fechaCreacion,
    fechaCita
  };
  const result = await db.collection('citas').insertOne(nuevaCita);
  return { _id: result.insertedId, ...nuevaCita };
};
