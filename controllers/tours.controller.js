const Tour = require('../models/tours.model');

class TourController {
  static async getAllTours(req, res) {
    try {
      const tours = await Tour.findAll();
      res.status(200).json(tours);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener tours' });
    }
  }
  
  static async getTourById(req, res) {
    try {
      const id_tours = req.params.id;
      const tour = await Tour.findById(id_tours);
      res.status(200).json(tour);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el tour' });
    }
  }

  static async createTour(req, res) {
    try {
      const { nombre, duracion, costo, descripcion } = req.body;
      const newTour = await Tour.create(new Tour(null, nombre, duracion, costo, descripcion));
      res.status(201).json({ message: 'Tour creado correctamente', tour: newTour });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error al crear tour' });
    }
  }

  static async updateTour(req, res) {
    try {
      const { nombre, duracion, costo, descripcion } = req.body;
      const id_tours = req.params.id;
      
      await Tour.update(new Tour(id_tours, nombre, duracion, costo, descripcion));
      
      res.status(200).json({ message: 'Tour actualizado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error al actualizar tour' });
    }
  }

  static async deleteTour(req, res) {
    try {
      const id_tours = req.params.id;
      await Tour.delete(id_tours);
      res.status(200).json({ message: 'Tour eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: 'Tour no encontrado' });
    }
  }
}

module.exports = TourController;
