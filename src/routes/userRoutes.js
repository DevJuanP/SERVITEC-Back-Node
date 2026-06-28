import { Router } from 'express';
import { obtenerTodosLosUsuarios, obtenerInfoUsuario, obtenerAsesores } from '../controllers/userController.js';
import { verificarToken, esAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

// Endpoint: GET /api/user (Obtener todos los usuarios)
router.get('/', verificarToken, esAdmin, obtenerTodosLosUsuarios);

// Endpoint: GET /api/user/myInfo (Obtener info del usuario logueado)
router.get('/myInfo', verificarToken, obtenerInfoUsuario);

// Endpoint: GET /api/user/asesores (Obtener asesores con rol admin, solo id y nombre)
router.get('/asesores', verificarToken, obtenerAsesores);

export default router;
