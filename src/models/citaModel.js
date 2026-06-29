import { getDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

const collectionName = 'tiposCitas';

export const getTypeCita = async () => {
  const db = getDB();
  return await db.collection(collectionName).find().toArray();
};

export const postCita = async ({ clienteId, asesorId, tipoCitaId, estado, fechaCreacion, fechaCita, descripcion }) => {
  const db = getDB();
  const nuevaCita = {
    clienteId: typeof clienteId === 'string' ? new ObjectId(clienteId) : clienteId,
    asesorId: typeof asesorId === 'string' ? new ObjectId(asesorId) : asesorId,
    tipoCitaId: typeof tipoCitaId === 'string' ? parseInt(tipoCitaId, 10) : tipoCitaId,
    estado,
    fechaCreacion: typeof fechaCreacion === 'string' ? new Date(fechaCreacion) : fechaCreacion,
    fechaCita: typeof fechaCita === 'string' ? new Date(fechaCita) : fechaCita,
    descripcion
  };
  const result = await db.collection('citas').insertOne(nuevaCita);

  const clienteObjectId = typeof clienteId === 'string' ? new ObjectId(clienteId) : clienteId;
  const asesorObjectId = typeof asesorId === 'string' ? new ObjectId(asesorId) : asesorId;

  await db.collection('usuarios').updateOne(
    { _id: clienteObjectId },
    { $push: { citas: result.insertedId } }
  );

  await db.collection('usuarios').updateOne(
    { _id: asesorObjectId },
    { $push: { citas: result.insertedId } }
  );

  return { _id: result.insertedId, ...nuevaCita };
};

export const cancelarCita = async (citaId) => {
  const db = getDB();
  const objectId = typeof citaId === 'string' ? new ObjectId(citaId) : citaId;

  return await db.collection('citas').updateOne(
    { _id: objectId },
    { $set: { estado: 'cancelado' } }
  );
};
