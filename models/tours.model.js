const sql = require('mssql');
const pool = require("../config/db");

class Tour {
  constructor(id, idPaquete, descripcion) {
    this.id = id;
    this.idPaquete = idPaquete;
    this.descripcion = descripcion;
  }

  static get tableName() {
    return 'tours';
  }

  static get columns() {
    return [
      'id',
      'id_paquete',
      'descripcion',
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
    const query = `SELECT * FROM ${this.tableName} WHERE id = @id`;
    try {
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query(query);
      return result.recordset[0];
    } catch (err) {
      throw err;
    }
  }

  static async create(tour) {
    const query = `INSERT INTO ${this.tableName} (id_paquete, descripcion) VALUES (@id_paquete, @descripcion)`;
    try {
      const result = await pool.request()
        .input('id_paquete', sql.Int, tour.idPaquete)
        .input('descripcion', sql.VarChar, tour.descripcion)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async update(tour) {
    const query = `UPDATE ${this.tableName} SET id_paquete = @id_paquete, descripcion = @descripcion WHERE id = @id`;
    try {
      const result = await pool.request()
        .input('id', sql.Int, tour.id)
        .input('id_paquete', sql.Int, tour.idPaquete)
        .input('descripcion', sql.VarChar, tour.descripcion)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id = @id`;
    try {
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Tour;
