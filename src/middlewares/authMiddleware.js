import jwt from 'jsonwebtoken';

// Middleware para verificar que el usuario tenga un token válido
export const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Espera el formato "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. No se proporcionó un token." });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioLogueado = verificado; // Guardamos los datos del token (id y rol) en la petición
    next(); // Da luz verde para continuar al siguiente paso
  } catch (error) {
    res.status(403).json({ error: "Token inválido o expirado" });
  }
}; // verifica el token y guarda los datos del usuario logueado en req.usuarioLogueado

// Middleware para permitir el paso SOLO a administradores
export const esAdmin = (req, res, next) => {
  if (req.usuarioLogueado.rol !== 'admin') {
    return res.status(403).json({ error: "Acceso restringido. Se requieren permisos de Administrador." });
  }
  next();
};