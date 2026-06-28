import { getDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

const collectionName = 'tiposCitas';

export const getTypeCita = async () => {
  const db = getDB();
  return await db.collection(collectionName).find().toArray();
};

export const postCita = async ({ clienteId, asesorId, tipoCitaId, estado, fechaCreacion, descripcion }) => {
  const db = getDB();
  const nuevaCita = {
    clienteId,
    asesorId,
    tipoCitaId,
    estado,
    fechaCreacion,
    descripcion
  };
  const result = await db.collection('citas').insertOne(nuevaCita);
  //ahora esa cita tiene que agregarse a la colección de citas del cliente y del asesor, para eso necesitamos sus ids
  await db.collection('clientes').updateOne(
    { _id: new ObjectId(clienteId) },
    { $push: { citas: result.insertedId } }
  );
  await db.collection('asesores').updateOne(
    { _id: new ObjectId(asesorId) },
    { $push: { citas: result.insertedId } }
  );
  return { _id: result.insertedId, ...nuevaCita };
};
