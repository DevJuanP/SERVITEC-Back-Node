import { getAllUsers, findUserById } from '../models/userModel.js';

export const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuarios = await getAllUsers();
    res.json({ usuarios });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const obtenerInfoUsuario = async (req, res) => {
  try {
    const userId = req.usuarioLogueado.id;
    const usuario = await findUserById(userId);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Por seguridad, no devolvemos la contraseña hasheada
    delete usuario.password;

    res.json({ usuario });
  } catch (error) {
    console.error("Error al obtener info del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
