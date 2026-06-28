import { getTypeCita, postCita } from '../models/citaModel.js';

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
    const clienteId = req.usuarioLogueado.id;

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
