import { getProductosConCategoria } from '../models/productoModel.js';

export const obtenerProductos = async (req, res) => {
  try {
    const productos = await getProductosConCategoria();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error interno del servidor al obtener productos" });
  }
};
