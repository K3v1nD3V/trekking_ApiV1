const Paquete = require('../models/paquete.model');

class PaqueteController {
  static async getAllPaquetes(req, res) {
    try {
      const paquetes = await Paquete.findAll();
      res.status(201).json(paquetes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener paquetes' });
    }
  }
  static async getPaqueteById(req, res) {
    try {
      const id = req.params.id;
      const paquete = await Paquete.findById(id);
      res.status(201).json(paquete);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el paquete' });
    }
  }

  static async updatePaquete(req, res) {
    try {
      const { nombre, valor, descripcion } = req.body;
      const id = req.params.id;
      console.log(id);
      
      await Paquete.update(new Paquete(id, nombre, valor, descripcion));
      
      res.status(201).json({ message: 'Paquete actulizado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error al actualizar paquete' });
    }
  }
  static async createPaquete(req, res) {
    try {
      const { nombre, valor, descripcion } = req.body;
      await Paquete.create(new Paquete(null, nombre, valor, descripcion));
      res.status(201).json({ message: 'Paquete creado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error al crear paquete' });
    }
  }

  static async deletePaquete(req, res) {
    try {
      const id = req.params.id;
      await Paquete.delete(id);
      res.status(201).json({ message: 'Paquete eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: 'Paquete no encontrado' });
    }
  }
}

module.exports = PaqueteController;