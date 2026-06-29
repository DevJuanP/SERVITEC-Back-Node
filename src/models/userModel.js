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

  const [usuario] = await db.collection(collectionName).aggregate([
    {
      $match: { _id: new ObjectId(id) }
    },
    {
      $lookup: {
        from: 'citas',
        localField: 'citas',
        foreignField: '_id',
        as: 'citas'
      }
    },
    {
      $unwind: {
        path: '$citas',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'usuarios',
        localField: 'citas.asesorId',
        foreignField: '_id',
        as: 'citas.asesorId'
      }
    },
    {
      $lookup: {
        from: 'tiposCitas',
        localField: 'citas.tipoCitaId',
        foreignField: '_id',
        as: 'citas.tipoCitaId'
      }
    },
    {
      $unwind: {
        path: '$citas.asesorId',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$citas.tipoCitaId',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: '$_id',
        nombre: { $first: '$nombre' },
        correo: { $first: '$correo' },
        rol: { $first: '$rol' },
        activo: { $first: '$activo' },
        fechaRegistro: { $first: '$fechaRegistro' },
        citas: {
          $push: {
            _id: '$citas._id',
            fechaCita: '$citas.fechaCita',
            fechaCreacion: '$citas.fechaCreacion',
            estado: '$citas.estado',
            descripcion: '$citas.descripcion',
            asesor: {
              _id: '$citas.asesorId._id',
              nombre: '$citas.asesorId.nombre',
              correo: '$citas.asesorId.correo'
            },
            tipoCita: '$citas.tipoCitaId'
          }
        }
      }
    }
  ]).toArray();

  return usuario;
};

export const getAsesores = async () => {
  const db = getDB();
  return await db.collection(collectionName)
    .find({ rol: 'admin' })
    .project({ _id: 1, nombre: 1 })
    .toArray();
};