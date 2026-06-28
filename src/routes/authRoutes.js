import { Router } from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/authController.js';

import { verificarToken, esAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

// Endpoint: POST /api/auth/register
router.post('/register', registrarUsuario);

// Endpoint: POST /api/auth/login
router.post('/login', loginUsuario)


export default router;