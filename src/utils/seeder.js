import { getDB } from '../config/db.js';

export const cargarUsers = async () => {
  try {
    const db = getDB();
    const count = await db.collection('usuarios').countDocuments();

    if (count === 0) {
      console.log('Colección de usuarios vacía. Insertando usuarios iniciales...');

      const usuariosIniciales = [
        // --- 10 ASESORES (rol: admin) ---
        {
          nombre : "Juan Admin",
          correo : "admin@a.com",
          password : "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol : "admin",
          activo : true,
          fechaRegistro : new Date("2026-06-14T07:59:44.501Z")
        },
        {
          nombre: "Ana Gómez",
          correo: "ana.asesor@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "admin",
          activo: true,
          fechaRegistro: new Date()
        },
        {
          nombre: "Diego Torres",
          correo: "diego.asesor@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "admin",
          activo: true,
          fechaRegistro: new Date()
        },
        {
          nombre: "Laura Castro",
          correo: "laura.asesor@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "admin",
          activo: true,
          fechaRegistro: new Date()
        },
        {
          nombre: "Miguel Ruiz",
          correo: "miguel.asesor@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "admin",
          activo: true,
          fechaRegistro: new Date()
        },
        {
          nombre: "Elena Flores",
          correo: "elena.asesor@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "admin",
          activo: true,
          fechaRegistro: new Date()
        },
        {
          nombre: "Javier López",
          correo: "javier.asesor@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "admin",
          activo: true,
          fechaRegistro: new Date()
        },
        {
          nombre: "Sofía Ortiz",
          correo: "sofia.asesor@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "admin",
          activo: true,
          fechaRegistro: new Date()
        },
        {
          nombre: "Pedro Rivas",
          correo: "pedro.asesor@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "admin",
          activo: true,
          fechaRegistro: new Date()
        },
        {
          nombre: "Carmen Silva",
          correo: "carmen.asesor@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "admin",
          activo: true,
          fechaRegistro: new Date()
        },
        // --- 10 CLIENTES (rol: cliente) ---
        {
          nombre: "Carlos Mendoza",
          correo: "carlos.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date()
        },
        {
          nombre: "María Delgado",
          correo: "maria.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date()
        },
        {
          nombre: "Jorge Herrera",
          correo: "jorge.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date()
        },
        {
          nombre: "Patricia Vidal",
          correo: "patricia.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date()
        },
        {
          nombre: "Luis Rojas",
          correo: "luis.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date()
        },
        {
          nombre: "Andrea Peña",
          correo: "andrea.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date()
        },
        {
          nombre: "Fernando Solis",
          correo: "fernando.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date()
        },
        {
          nombre: "Gabriela Luna",
          correo: "gabriela.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date()
        },
        {
          nombre: "Roberto Díaz",
          correo: "roberto.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date()
        },
        {
          nombre: "Lucía Méndez",
          correo: "lucia.cliente@servitec.com",
          password: "$2b$10$wT0pbPEPh5FpGLKTu0bC8.3YkZw8uKfYJz9RMP4alYDk1O/44oZcG", // password: 123
          rol: "cliente",
          activo: true,
          fechaRegistro: new Date()
        }
      ];

      await db.collection('usuarios').insertMany(usuariosIniciales);
      console.log('¡Usuarios iniciales (asesores y clientes) cargados correctamente!');
    } else {
      console.log('La colección de usuarios ya contiene datos. Omitiendo la siembra de datos.');
    }
  } catch (error) {
    console.error('Error al sembrar los usuarios iniciales:', error);
  }
};
