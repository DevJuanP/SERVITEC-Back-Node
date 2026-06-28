import { Router } from 'express';
import { obtenerTodosLosUsuarios, obtenerInfoUsuario } from '../controllers/userController.js';
import { verificarToken, esAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

// Endpoint: GET /api/user (Obtener todos los usuarios)
router.get('/', verificarToken, esAdmin, obtenerTodosLosUsuarios);

// Endpoint: GET /api/user/myInfo (Obtener info del usuario logueado)
router.get('/myInfo', verificarToken, obtenerInfoUsuario);

export default router;
