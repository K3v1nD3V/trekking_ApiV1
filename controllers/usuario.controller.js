const Usuario = require('../models/usuario.model');

class UsuarioController {
  static async getAllUsuarios(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener usuarios' });
    }
  }

  // Obtener datos a través del ID
  static async getUsuarioById(req, res) {
    try {
      const id = req.params.id_usuario;
      const usuario = await Usuario.findById(id);
      if (!usuario || usuario.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el usuario' });
    }
  }

  static async createUsuario(req, res) {
    try {
      const { user_name, email } = req.body;
      const nuevoUsuario = new Usuario(null, user_name, email);
      await Usuario.create(nuevoUsuario);
      res.status(201).json({ message: 'Usuario creado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error al crear usuario' });
    }
  }

  // Modificar usuario
  static async updateUsuario(req, res) {
    try {
      const id = req.params.id_usuario;
      const { user_name, email } = req.body;

      const usuario = new Usuario(id, user_name, email);
      const result = await Usuario.update(usuario);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado para actualizar' });
      }

      res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error al actualizar usuario' });
    }
  }

  // Método para eliminar
  static async deleteUsuario(req, res) {
    try {
      const id = req.params.id_usuario;
      const result = await Usuario.delete(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado para eliminar' });
      }

      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
  }
}

module.exports = UsuarioController;
