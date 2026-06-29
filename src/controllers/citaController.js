import { getTypeCita, postCita, cancelarCita as cancelarCitaModel } from '../models/citaModel.js';
import { getDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

export const obtenerTiposCitas = async (req, res) => {
  try {
    const tiposCitas = await getTypeCita();
    res.json({ tiposCitas });
  } catch (error) {
    console.error('Error al obtener tipos de cita:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const agregarCita = async (req, res) => {
  try {
    // clienteId viene del token JWT (puesto por el middleware verificarToken)
    const clienteId = req.usuarioLogueado.id;//lo recibe como tipo string, el modelo lo convierte a ObjectId

    // asesorId y tipoCitaId los manda el front en el body
    const { asesorId, tipoCitaId, fechaCita, descripcion
     } = req.body;

    if (!asesorId || !tipoCitaId) {
      return res.status(400).json({ error: 'asesorId y tipoCitaId son obligatorios' });
    }

    const nuevaCita = await postCita({
      clienteId,
      asesorId,
      tipoCitaId,
      estado: 'Pendiente',       // valor por defecto
      fechaCreacion: new Date(),  // hora actual del servidor
      fechaCita,
      descripcion
    });

    res.status(201).json({ mensaje: 'Cita agendada correctamente', cita: nuevaCita });
  } catch (error) {
    console.error('Error al agregar cita:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const cancelarCita = async (req, res) => {
  try {
    if (req.usuarioLogueado.rol !== 'cliente') {
      return res.status(403).json({ error: 'Solo los clientes pueden cancelar citas' });
    }

    const { citaId } = req.body;

    if (!citaId) {
      return res.status(400).json({ error: 'citaId es obligatorio' });
    }

    const db = getDB();
    const cita = await db.collection('citas').findOne({ _id: new ObjectId(citaId) });

    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    if (cita.clienteId?.toString() !== req.usuarioLogueado.id) {
      return res.status(403).json({ error: 'No puedes cancelar una cita que no te pertenece' });
    }

    const result = await cancelarCitaModel(citaId);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'No se pudo cancelar la cita' });
    }

    res.json({ mensaje: 'Cita cancelada correctamente', citaId });
  } catch (error) {
    console.error('Error al cancelar cita:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
