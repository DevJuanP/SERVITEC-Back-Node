import bcrypt from 'bcrypt';
import { findUserByEmail, createUser } from '../models/userModel.js';

import jwt from 'jsonwebtoken';

export const registrarUsuario = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;

  // 1. Validar que vengan los campos obligatorios
  if (!nombre || !correo || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios (nombre, correo, password)" });
  }

  try {
    // 2. Verificar si el usuario ya existe
    const usuarioExistente = await findUserByEmail(correo);
    if (usuarioExistente) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    // 3. Hashear la contraseña con Bcrypt (10 rondas de sal)
    const salt = await bcrypt.genSalt(10);
    const passwordHasheado = await bcrypt.hash(password, salt);

    // 4. Definir el rol (Por defecto es 'cliente', a menos que explícitamente se registre un 'admin')
    const rolAsignado = (rol === 'admin') ? 'admin' : 'cliente';

    // 5. Preparar el objeto del nuevo usuario, para el DB
    const nuevoUsuario = {
      nombre,
      correo,
      password: passwordHasheado,
      rol: rolAsignado,
      activo: true,
      fechaRegistro: new Date()
    };

    // 6. Guardar en MongoDB
    await createUser(nuevoUsuario);

    // 7. Responder al cliente (NUNCA devuelvas el password en la respuesta)
    res.status(201).json({
      mensaje: "Usuario registrado con éxito",
      usuario: {
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        rol: nuevoUsuario.rol
      }
    });

  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ error: "Hubo un error interno en el servidor" });
  }
};

export const loginUsuario = async (req, res) => {
    const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: "Correo y contraseña son obligatorios" });
  }

  try {
    // 1. Buscar si el usuario existe
    const usuario = await findUserByEmail(correo);
    if (!usuario) {
      return res.status(400).json({ error: "Credenciales incorrectas (Correo no encontrado)" });
    }

    // 2. Comparar la contraseña enviada con el hash de la DB
    const passwordHasheado = await bcrypt.compare(password, usuario.password);
    if (!passwordHasheado) {
      return res.status(400).json({ error: "Credenciales incorrectas (Contraseña inválida)" });
    }

    // 3. Generar el Token JWT guardando el ID y el ROL del usuario dentro de él
    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '2h' } // El token expira en 2 horas
    );

    // 4. Responder con el token
    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }

}