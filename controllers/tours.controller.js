const Tour = require('../models/tours.model');

class TourController {
  static async getAllTours(req, res) {
    try {
      const tours = await Tour.findAll();
      res.status(201).json(tours);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener tours' });
    }
  }
  
  static async getTourById(req, res) {
    try {
      const id = req.params.id;
      const tour = await Tour.findById(id);
      res.status(201).json(tour);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el tour' });
    }
  }

  static async createTour(req, res) {
    try {
      const { idPaquete, descripcion } = req.body;
      await Tour.create(new Tour(null, idPaquete, descripcion));
      res.status(201).json({ message: 'Tour creado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error al crear tour' });
    }
  }

  static async updateTour(req, res) {
    try {
      const { idPaquete, descripcion } = req.body;
      const id = req.params.id;
      console.log(id);
      
      await Tour.update(new Tour(id, idPaquete, descripcion));
      
      res.status(201).json({ message: 'Tour actualizado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error al actualizar tour' });
    }
  }

  static async deleteTour(req, res) {
    try {
      const id = req.params.id;
      await Tour.delete(id);
      res.status(201).json({ message: 'Tour eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: 'Tour no encontrado' });
    }
  }
}

module.exports = TourController;
