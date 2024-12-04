const Paquete = require('../models/paquete.model');

class PaqueteController {
  static async getAllPaquetes(req, res) {
    try {
      const paquetes = await Paquete.findAll();
      res.status(200).json(paquetes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener paquetes' });
    }
  }
  
  static async getPaqueteById(req, res) {
    try {
      const id_paquetes = req.params.id;
      const paquete = await Paquete.findById(id_paquetes);
      res.status(200).json(paquete);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el paquete' });
    }
  }

  static async createPaquete(req, res) {
    try {
      const { nombre, valor, descripcion } = req.body;
      const newPaquete = await Paquete.create(new Paquete(null, nombre, valor, descripcion));
      res.status(201).json({ message: 'Paquete creado correctamente', paquete: newPaquete });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error al crear paquete' });
    }
  }

  static async updatePaquete(req, res) {
    try {
      const { nombre, valor, descripcion } = req.body;
      const id_paquetes = req.params.id;
      
      await Paquete.update(new Paquete(id_paquetes, nombre, valor, descripcion));
      
      res.status(200).json({ message: 'Paquete actualizado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error al actualizar paquete' });
    }
  }

  static async deletePaquete(req, res) {
    try {
      const id_paquetes = req.params.id;
      await Paquete.delete(id_paquetes);
      res.status(200).json({ message: 'Paquete eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: 'Paquete no encontrado' });
    }
  }
}

module.exports = PaqueteController;
