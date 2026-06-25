import { Router } from 'express';
import { registrarUsuario, loginUsuario, obtenerTodosLosUsuarios} from '../controllers/authController.js';

import { verificarToken, esAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

// Endpoint: POST /api/auth/register
router.post('/register', registrarUsuario);

// Endpoint: POST /api/auth/login
router.post('/login', loginUsuario)

// Primero verifica el token, luego verifica si es admin, y si pasa ambos, muestra los usuarios.
router.get('/usuarios', verificarToken, esAdmin, obtenerTodosLosUsuarios);

export default router;