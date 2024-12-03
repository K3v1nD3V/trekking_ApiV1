const Calendario = require('../models/calendario.model');

class CalendarioController {
  static async getAllCalendarios(req, res) {
    try {
      const calendarios = await Calendario.findAll();
      res.status(200).json(calendarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener calendarios' });
    }
  }

  static async getCalendarioById(req, res) {
    try {
      const id = req.params.id;
      const calendario = await Calendario.findById(id);
      if (!calendario) {
        return res.status(404).json({ message: 'Calendario no encontrado' });
      }
      res.status(200).json(calendario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el calendario' });
    }
  }

  static async createCalendario(req, res) {
    try {
      const { idGuia, fechaInicio, fechaFin, horaRecogida, lugar, asistentes } = req.body;
      await Calendario.create(new Calendario(null, idGuia, fechaInicio, fechaFin, horaRecogida, lugar, asistentes));
      res.status(201).json({ message: 'Calendario creado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error al crear calendario' });
    }
  }

  static async updateCalendario(req, res) {
    try {
      const id = req.params.id;
      const { idGuia, fechaInicio, fechaFin, horaRecogida, lugar, asistentes } = req.body;
      const calendario = await Calendario.findById(id);
      if (!calendario) {
        return res.status(404).json({ message: 'Calendario no encontrado' });
      }
      await Calendario.update(new Calendario(id, idGuia, fechaInicio, fechaFin, horaRecogida, lugar, asistentes));
      res.status(200).json({ message: 'Calendario actualizado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error al actualizar calendario' });
    }
  }

  static async deleteCalendario(req, res) {
    try {
      const id = req.params.id;
      const calendario = await Calendario.findById(id);
      if (!calendario) {
        return res.status(404).json({ message: 'Calendario no encontrado' });
      }
      await Calendario.delete(id);
      res.status(200).json({ message: 'Calendario eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar calendario' });
    }
  }
}

module.exports = CalendarioController;