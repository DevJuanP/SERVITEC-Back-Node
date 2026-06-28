import { getDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

export const cargarUsers = async () => {
  try {
    const db = getDB();
    const count = await db.collection('usuarios').countDocuments();
    const countCitas = await db.collection('citas').countDocuments();

    if (count === 0 && countCitas === 0) {
      console.log('Colección de usuarios y citas vacía. Insertando usuarios iniciales...');

      const usuariosIniciales = [
        // --- 10 ASESORES (rol: admin) ---
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2c9"),
          nombre : "Juan Admin",
          correo : "admin@a.com",
          password : "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol : "admin",
          activo : true,
          fechaRegistro : new Date("2026-06-14T07:59:44.501Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe301"),
            new ObjectId("6a409ccaa2bc90e1c99fe314")
          ]
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2ca"),
          nombre: "Ana Gómez",
          correo: "ana.asesor@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "admin",
          activo: true,
          fechaRegistro: new Date("2026-06-28T04:02:18.329Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe302"),
            new ObjectId("6a409ccaa2bc90e1c99fe303")
          ]
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2cb"),
          nombre: "Diego Torres",
          correo: "diego.asesor@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "admin",
          activo: true,
          fechaRegistro: new Date("2026-06-28T04:02:18.329Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe304"),
            new ObjectId("6a409ccaa2bc90e1c99fe305")
          ]
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2cc"),
          nombre: "Laura Castro",
          correo: "laura.asesor@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "admin",
          activo: true,
          fechaRegistro: new Date("2026-06-28T04:02:18.329Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe306"),
            new ObjectId("6a409ccaa2bc90e1c99fe307")
          ]
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2cd"),
          nombre: "Miguel Ruiz",
          correo: "miguel.asesor@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "admin",
          activo: true,
          fechaRegistro: new Date("2026-06-28T04:02:18.329Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe308"),
            new ObjectId("6a409ccaa2bc90e1c99fe309")
          ]
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2ce"),
          nombre: "Elena Flores",
          correo: "elena.asesor@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "admin",
          activo: true,
          fechaRegistro: new Date("2026-06-28T04:02:18.329Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe30a"),
            new ObjectId("6a409ccaa2bc90e1c99fe30b")
          ]
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2cf"),
          nombre: "Javier López",
          correo: "javier.asesor@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "admin",
          activo: true,
          fechaRegistro: new Date("2026-06-28T04:02:18.329Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe30c"),
            new ObjectId("6a409ccaa2bc90e1c99fe30d")
          ]
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2d0"),
          nombre: "Sofía Ortiz",
          correo: "sofia.asesor@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "admin",
          activo: true,
          fechaRegistro: new Date("2026-06-28T04:02:18.329Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe30e"),
            new ObjectId("6a409ccaa2bc90e1c99fe30f")
          ]
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2d1"),
          nombre: "Pedro Rivas",
          correo: "pedro.asesor@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "admin",
          activo: true,
          fechaRegistro: new Date("2026-06-28T04:02:18.329Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe310"),
            new ObjectId("6a409ccaa2bc90e1c99fe311")
          ]
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2d2"),
          nombre: "Carmen Silva",
          correo: "carmen.asesor@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "admin",
          activo: true,
          fechaRegistro: new Date("2026-06-28T04:02:18.329Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe312"),
            new ObjectId("6a409ccaa2bc90e1c99fe313")
          ]
        },

        // --- 10 CLIENTES (rol: cliente) ---
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2d3"),
          nombre: "Carlos Mendoza",
          correo: "carlos.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date("2026-06-28T04:02:18.329Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe301"),
            new ObjectId("6a409ccaa2bc90e1c99fe302")
          ]
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2d4"),
          nombre: "María Delgado",
          correo: "maria.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date("2026-06-28T04:02:18.329Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe303"),
            new ObjectId("6a409ccaa2bc90e1c99fe304")
          ]
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2d5"),
          nombre: "Jorge Herrera",
          correo: "jorge.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date("2026-06-28T04:02:18.329Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe305"),
            new ObjectId("6a409ccaa2bc90e1c99fe306")
          ]
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2d6"),
          nombre: "Patricia Vidal",
          correo: "patricia.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date("2026-06-28T04:02:18.329Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe307"),
            new ObjectId("6a409ccaa2bc90e1c99fe308")
          ]
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2d7"),
          nombre: "Luis Rojas",
          correo: "luis.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date("2026-06-28T04:02:18.329Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe309"),
            new ObjectId("6a409ccaa2bc90e1c99fe30a")
          ]
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2d8"),
          nombre: "Andrea Peña",
          correo: "andrea.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date("2026-06-28T04:02:18.329Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe30b"),
            new ObjectId("6a409ccaa2bc90e1c99fe30c")
          ]
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2d9"),
          nombre: "Fernando Solis",
          correo: "fernando.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date("2026-06-28T04:02:18.329Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe30d"),
            new ObjectId("6a409ccaa2bc90e1c99fe30e")
          ]
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2da"),
          nombre: "Gabriela Luna",
          correo: "gabriela.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date("2026-06-28T04:02:18.329Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe30f"),
            new ObjectId("6a409ccaa2bc90e1c99fe310")
          ]
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2db"),
          nombre: "Roberto Díaz",
          correo: "roberto.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date("2026-06-28T04:02:18.329Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe311"),
            new ObjectId("6a409ccaa2bc90e1c99fe312")
          ]
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe2dc"),
          nombre: "Lucía Méndez",
          correo: "lucia.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date("2026-06-28T04:02:18.329Z"),
          citas: [
            new ObjectId("6a409ccaa2bc90e1c99fe313"),
            new ObjectId("6a409ccaa2bc90e1c99fe314")
          ]
        }
      ];

      const citasIniciales = [
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe301"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2d3"), // Carlos Mendoza
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2c9"),   // Juan Admin
          tipoCitaId: 1, // Presencial
          estado: "Realizada",
          fechaCreacion: new Date("2026-06-28T01:00:00.000Z"),
          fechaCita: new Date("2026-07-01T10:00:00.000Z")
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe302"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2d3"), // Carlos Mendoza
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2ca"),   // Ana Gómez
          tipoCitaId: 2, // Virtual
          estado: "Pendiente",
          fechaCreacion: new Date("2026-06-28T01:10:00.000Z"),
          fechaCita: new Date("2026-07-05T15:30:00.000Z")
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe303"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2d4"), // María Delgado
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2ca"),   // Ana Gómez
          tipoCitaId: 1, // Presencial
          estado: "Realizada",
          fechaCreacion: new Date("2026-06-28T01:15:00.000Z"),
          fechaCita: new Date("2026-07-02T11:00:00.000Z")
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe304"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2d4"), // María Delgado
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2cb"),   // Diego Torres
          tipoCitaId: 2, // Virtual
          estado: "cancelado",
          fechaCreacion: new Date("2026-06-28T01:20:00.000Z"),
          fechaCita: new Date("2026-07-03T09:00:00.000Z")
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe305"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2d5"), // Jorge Herrera
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2cb"),   // Diego Torres
          tipoCitaId: 1, // Presencial
          estado: "Realizada",
          fechaCreacion: new Date("2026-06-28T01:25:00.000Z"),
          fechaCita: new Date("2026-07-02T16:00:00.000Z")
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe306"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2d5"), // Jorge Herrera
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2cc"),   // Laura Castro
          tipoCitaId: 2, // Virtual
          estado: "Pendiente",
          fechaCreacion: new Date("2026-06-28T01:30:00.000Z"),
          fechaCita: new Date("2026-07-06T14:00:00.000Z")
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe307"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2d6"), // Patricia Vidal
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2cc"),   // Laura Castro
          tipoCitaId: 1, // Presencial
          estado: "Realizada",
          fechaCreacion: new Date("2026-06-28T01:35:00.000Z"),
          fechaCita: new Date("2026-07-04T10:30:00.000Z")
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe308"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2d6"), // Patricia Vidal
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2cd"),   // Miguel Ruiz
          tipoCitaId: 2, // Virtual
          estado: "Pendiente",
          fechaCreacion: new Date("2026-06-28T01:40:00.000Z"),
          fechaCita: new Date("2026-07-07T11:30:00.000Z")
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe309"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2d7"), // Luis Rojas
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2cd"),   // Miguel Ruiz
          tipoCitaId: 1, // Presencial
          estado: "cancelado",
          fechaCreacion: new Date("2026-06-28T01:45:00.000Z"),
          fechaCita: new Date("2026-07-01T12:00:00.000Z")
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe30a"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2d7"), // Luis Rojas
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2ce"),   // Elena Flores
          tipoCitaId: 2, // Virtual
          estado: "Pendiente",
          fechaCreacion: new Date("2026-06-28T01:50:00.000Z"),
          fechaCita: new Date("2026-07-08T16:00:00.000Z")
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe30b"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2d8"), // Andrea Peña
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2ce"),   // Elena Flores
          tipoCitaId: 1, // Presencial
          estado: "Realizada",
          fechaCreacion: new Date("2026-06-28T01:55:00.000Z"),
          fechaCita: new Date("2026-07-03T15:00:00.000Z")
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe30c"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2d8"), // Andrea Peña
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2cf"),   // Javier López
          tipoCitaId: 2, // Virtual
          estado: "Pendiente",
          fechaCreacion: new Date("2026-06-28T02:00:00.000Z"),
          fechaCita: new Date("2026-07-09T09:30:00.000Z")
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe30d"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2d9"), // Fernando Solis
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2cf"),   // Javier López
          tipoCitaId: 1, // Presencial
          estado: "Realizada",
          fechaCreacion: new Date("2026-06-28T02:05:00.000Z"),
          fechaCita: new Date("2026-07-04T13:00:00.000Z")
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe30e"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2d9"), // Fernando Solis
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2d0"),   // Sofía Ortiz
          tipoCitaId: 2, // Virtual
          estado: "cancelado",
          fechaCreacion: new Date("2026-06-28T02:10:00.000Z"),
          fechaCita: new Date("2026-07-05T14:30:00.000Z")
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe30f"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2da"), // Gabriela Luna
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2d0"),   // Sofía Ortiz
          tipoCitaId: 1, // Presencial
          estado: "Realizada",
          fechaCreacion: new Date("2026-06-28T02:15:00.000Z"),
          fechaCita: new Date("2026-07-05T17:00:00.000Z")
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe310"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2da"), // Gabriela Luna
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2d1"),   // Pedro Rivas
          tipoCitaId: 2, // Virtual
          estado: "Pendiente",
          fechaCreacion: new Date("2026-06-28T02:20:00.000Z"),
          fechaCita: new Date("2026-07-10T10:00:00.000Z")
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe311"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2db"), // Roberto Díaz
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2d1"),   // Pedro Rivas
          tipoCitaId: 1, // Presencial
          estado: "Realizada",
          fechaCreacion: new Date("2026-06-28T02:25:00.000Z"),
          fechaCita: new Date("2026-07-06T12:00:00.000Z")
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe312"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2db"), // Roberto Díaz
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2d2"),   // Carmen Silva
          tipoCitaId: 2, // Virtual
          estado: "Pendiente",
          fechaCreacion: new Date("2026-06-28T02:30:00.000Z"),
          fechaCita: new Date("2026-07-12T15:00:00.000Z")
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe313"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2dc"), // Lucía Méndez
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2d2"),   // Carmen Silva
          tipoCitaId: 1, // Presencial
          estado: "Realizada",
          fechaCreacion: new Date("2026-06-28T02:35:00.000Z"),
          fechaCita: new Date("2026-07-08T11:00:00.000Z")
        },
        {
          _id: new ObjectId("6a409ccaa2bc90e1c99fe314"),
          clienteId: new ObjectId("6a409ccaa2bc90e1c99fe2dc"), // Lucía Méndez
          asesorId: new ObjectId("6a409ccaa2bc90e1c99fe2c9"),   // Juan Admin
          tipoCitaId: 2, // Virtual
          estado: "Pendiente",
          fechaCreacion: new Date("2026-06-28T02:40:00.000Z"),
          fechaCita: new Date("2026-07-13T16:30:00.000Z")
        }
      ];

      await db.collection('usuarios').insertMany(usuariosIniciales);
      await db.collection('citas').insertMany(citasIniciales);
      console.log('¡Usuarios iniciales (asesores y clientes) y citas iniciales cargados correctamente!');
    } else {
      console.log('La colección de usuarios ya contiene datos. Omitiendo la siembra de datos.');
    }
  } catch (error) {
    console.error('Error al sembrar los usuarios iniciales y citas:', error);
  }
};
