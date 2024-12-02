const Servicio = require('../models/servicios.model');

class ServicioController {

    //Obtener todos los datos
  static async getAllServicios(req, res) {
    try {
      const servicios = await Servicio.findAll();
      res.status(200).json(servicios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener servicios' });
    }
  }

    //Obtener datos a través del ID
  static async getServicioById(req, res) {
    try {
      const id = req.params.id_servicio;
      const servicio = await Servicio.findById(id); 
      if (!servicio || servicio.length === 0) { 
        return res.status(404).json({ message: 'Servicio no encontrado' });
      }
      res.status(200).json(servicio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el servicio' });
    }
  }

  //Crear un servicio
  static async createServicio(req, res) {
    try {
      const { nombre, precio, categoria} = req.body;
      const nuevoServicio = new Servicio(null, nombre, precio, categoria); 
      await Servicio.create(nuevoServicio);
      res.status(201).json({ message: 'Servicio creado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error al crear servicio' });
    }
  }

  //Modificar servicio
  static async updateServicio(req, res) {
    try {
      const id = req.params.id_servicio;
      const { nombre, precio, categoria} = req.body;

      const servicio = new Servicio(id, nombre, precio, categoria); 
      const result = await Servicio.update(servicio);

      if (result.affectedRows === 0) { 
        return res.status(404).json({ message: 'Servicio no encontrado para actualizar' });
      }

      res.status(200).json({ message: 'Servicio actualizado correctamente'});
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error al actualizar servicio' });
    }
  }

  //Método para eliminar 
  static async deleteServicio(req, res) {
    try {
      const id = req.params.id_servicio;
      const result = await Servicio.delete(id);

      if (result.affectedRows === 0) { 
        return res.status(404).json({ message: 'Servicio no encontrado para eliminar' });
      }

      res.status(200).json({ message: 'Servicio eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar el servicio' });
    }
  }
}

module.exports = ServicioController;
