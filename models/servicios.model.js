const sql = require('mssql');
const pool = require("../config/db");

class Servicio {
  constructor(id_servicio, nombre, precio, categoria) {
    this.id_servicio = id_servicio;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
  }

  static get tableName() {
    return 'servicios';
  }

  static get columns() {
    return [
      'id_servicio',
      'nombre',
      'precio',
      'categoria'
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
    const query = `SELECT * FROM ${this.tableName} WHERE id_servicio = @id_servicio`;
    try {
      const result = await pool.request()
        .input('id_servicio', sql.Int, id)
        .query(query);
      return result.recordset[0];
    } catch (err) {
      throw err;
    }
  }

  static async create(servicio) {
    const query = `INSERT INTO ${this.tableName} (nombre, precio, categoria) VALUES (@nombre, @precio, @categoria)`;
    try {
      const result = await pool.request()
        .input('nombre', sql.VarChar, servicio.nombre)
        .input('precio', sql.Decimal, servicio.precio)
        .input('categoria', sql.VarChar, servicio.categoria)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async update(servicio) {
    const query = `UPDATE ${this.tableName} SET nombre = @nombre, precio = @precio, categoria = @categoria WHERE id_servicio = @id_servicio`;
    try {
      const result = await pool.request()
        .input('id_servicio', sql.Int, servicio.id_servicio)
        .input('nombre', sql.VarChar, servicio.nombre)
        .input('precio', sql.Decimal, servicio.precio)
        .input('categoria', sql.VarChar, servicio.categoria)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async delete(id_servicio) {
    const query = `DELETE FROM ${this.tableName} WHERE id_servicio = @id_servicio`;
    try {
      const result = await pool.request()
        .input('id_servicio', sql.Int, id_servicio)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Servicio;
