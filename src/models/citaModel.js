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

  const clienteObjectId = typeof clienteId === 'string' ? new ObjectId(clienteId) : clienteId;
  const asesorObjectId = typeof asesorId === 'string' ? new ObjectId(asesorId) : asesorId;

  await db.collection('usuarios').updateOne(
    { _id: clienteObjectId },
    { $addToSet: { citas: result.insertedId } }
  );

  await db.collection('usuarios').updateOne(
    { _id: asesorObjectId },
    { $addToSet: { citas: result.insertedId } }
  );

  return { _id: result.insertedId, ...nuevaCita };
};
