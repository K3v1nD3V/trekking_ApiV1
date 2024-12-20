const sql = require('mssql');
const pool = require("../config/db");

class Guia {
  constructor(id_guia, nombre, apellido, correo, telefono) {
    this.id_guia = id_guia;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.telefono = telefono;
  }

  static get tableName() {
    return 'guias';
  }

  static get columns() {
    return [
      'id_guia',
      'nombre',
      'apellido',
      'correo',
      'telefono'
    ];
  }

  static async findAll() {
    const query = `SELECT * FROM ${this.tableName}`;
    try {
      const result = await pool.request().query(query);
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async findById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id_guia = @id_guia`;
    try {
      const result = await pool.request()
        .input('id_guia', sql.Int, id)
        .query(query);
      return result.recordset[0];
    } catch (err) {
      throw err;
    }
  }

  static async create(guia) {
    const query = `INSERT INTO ${this.tableName} (nombre, apellido, correo, telefono) VALUES (@nombre, @apellido, @correo, @telefono)`;
    try {
      const result = await pool.request()
        .input('nombre', sql.VarChar, guia.nombre)
        .input('apellido', sql.VarChar, guia.apellido)
        .input('correo', sql.VarChar, guia.correo)
        .input('telefono', sql.VarChar, guia.telefono)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async update(guia) {
    const query = `UPDATE ${this.tableName} SET nombre = @nombre, apellido = @apellido, correo = @correo, telefono = @telefono WHERE id_guia = @id_guia`;
    try {
      const result = await pool.request()
        .input('id_guia', sql.Int, guia.id_guia)
        .input('nombre', sql.VarChar, guia.nombre)
        .input('apellido', sql.VarChar, guia.apellido)
        .input('correo', sql.VarChar, guia.correo)
        .input('telefono', sql.VarChar, guia.telefono)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async delete(id_guia) {
    const query = `DELETE FROM ${this.tableName} WHERE id_guia = @id_guia`;
    try {
      const result = await pool.request()
        .input('id_guia', sql.Int, id_guia)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Guia;
