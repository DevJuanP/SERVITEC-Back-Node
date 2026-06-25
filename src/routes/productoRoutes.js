import { Router } from 'express';
import { obtenerProductos } from '../controllers/productoController.js';

const router = Router();

// Endpoint: GET /api/productos
router.get('/', obtenerProductos);

export default router;
