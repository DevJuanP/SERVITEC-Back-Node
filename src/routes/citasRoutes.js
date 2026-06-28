import { Router } from 'express';
import { obtenerTiposCitas, agregarCita } from '../controllers/citaController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Endpoint: GET /api/cita/tipoCita (libre, no requiere token)
router.get('/tipoCita', obtenerTiposCitas);

// Endpoint: POST /api/cita/agregarCita (requiere token, cualquier usuario logueado puede agendar)
router.post('/agregarCita', verificarToken, agregarCita);

export default router;
