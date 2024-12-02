const Guia = require('../models/guia.model');

class GuiaController {
  static async getAllGuias(req, res) {
    try {
      const guias = await Guia.findAll();
      res.status(200).json(guias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener guías' });
    }
  }

  static async getGuiaById(req, res) {
    try {
      const id = req.params.id_guia;
      const guia = await Guia.findById(id); 
      if (!guia || guia.length === 0) { 
        return res.status(404).json({ message: 'Guía no encontrada' });
      }
      res.status(200).json(guia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener la guía' });
    }
  }

  static async createGuia(req, res) {
    try {
      const { nombre, apellido, correo, telefono } = req.body;
      const nuevaGuia = new Guia(null, nombre, apellido, correo, telefono); 
      await Guia.create(nuevaGuia);
      res.status(201).json({ message: 'Guía creada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error al crear guía' });
    }
  }

  static async updateGuia(req, res) {
    try {
      const id = req.params.id_guia;
      const { nombre, apellido, correo, telefono } = req.body;

      const guia = new Guia(id, nombre, apellido, correo, telefono); 
      const result = await Guia.update(guia);

      if (result.affectedRows === 0) { 
        return res.status(404).json({ message: 'Guía no encontrada para actualizar' });
      }

      res.status(200).json({ message: 'Guía actualizada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error al actualizar guía' });
    }
  }

  static async deleteGuia(req, res) {
    try {
      const id = req.params.id_guia;
      const result = await Guia.delete(id);

      if (result.affectedRows === 0) { 
        return res.status(404).json({ message: 'Guía no encontrada para eliminar' });
      }

      res.status(200).json({ message: 'Guía eliminada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar la guía' });
    }
  }
}

module.exports = GuiaController;
