const Cliente = require('../models/cliente.model');

class ClienteController {
  static async getAllClientes(req, res) {
    try {
      const clientes = await Cliente.findAll();
      res.status(200).json(clientes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener clientes' });
    }
  }

    //Obtener datos a través del ID
  static async getClienteById(req, res) {
    try {
      const id = req.params.id_cliente;
      const cliente = await Cliente.findById(id); 
      if (!cliente || cliente.length === 0) { 
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      res.status(200).json(cliente);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el cliente' });
    }
  }

  static async createCliente(req, res) {
    try {
      const { nombre, apellido, correo, telefono } = req.body;
      const nuevoCliente = new Cliente(null, nombre, apellido, correo, telefono); 
      await Cliente.create(nuevoCliente);
      res.status(201).json({ message: 'Cliente creado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error al crear cliente' });
    }
  }

  //Modificar cliente
  static async updateCliente(req, res) {
    try {
      const id = req.params.id_cliente;
      const { nombre, apellido, correo, telefono } = req.body;

      const cliente = new Cliente(id, nombre, apellido, correo, telefono); 
      const result = await Cliente.update(cliente);

      if (result.affectedRows === 0) { 
        return res.status(404).json({ message: 'Cliente no encontrado para actualizar' });
      }

      res.status(200).json({ message: 'Cliente actualizado correctamente'});
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error al actualizar cliente' });
    }
  }

  //Método para eliminar 
  static async deleteCliente(req, res) {
    try {
      const id = req.params.id_cliente;
      const result = await Cliente.delete(id);

      if (result.affectedRows === 0) { 
        return res.status(404).json({ message: 'Cliente no encontrado para eliminar' });
      }

      res.status(200).json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar el cliente' });
    }
  }
}

module.exports = ClienteController;
