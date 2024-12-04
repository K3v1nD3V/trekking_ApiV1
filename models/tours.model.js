const sql = require('mssql');
const pool = require("../config/db");

class Tour {
  constructor(id_tours, id_paquete, descripcion) {
    this.id_tours = id_tours;
    this.id_paquete = id_paquete;
    this.descripcion = descripcion;
  }

  static get tableName() {
    return 'tours';
  }

  static get columns() {
    return [
      'id_tours',
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
  
  static async findById(id_tours) {
    const query = `SELECT * FROM ${this.tableName} WHERE id_tours = @id_tours`;
    try {
      const result = await pool.request()
        .input('id_tours', sql.Int, id_tours)
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
        .input('id_paquete', sql.Int, tour.id_paquete)
        .input('descripcion', sql.VarChar, tour.descripcion)
        .query(query);

      const createdTour = await pool.request().query('SELECT @@IDENTITY AS id_tours');
      return { id_tours: createdTour.recordset[0].id_tours, ...tour };
    } catch (err) {
      throw err;
    }
  }

  static async update(tour) {
    const query = `UPDATE ${this.tableName} SET id_paquete = @id_paquete, descripcion = @descripcion WHERE id_tours = @id_tours`;
    try {
      const result = await pool.request()
        .input('id_tours', sql.Int, tour.id_tours)
        .input('id_paquete', sql.Int, tour.id_paquete)
        .input('descripcion', sql.VarChar, tour.descripcion)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async delete(id_tours) {
    const query = `DELETE FROM ${this.tableName} WHERE id_tours = @id_tours`;
    try {
      const result = await pool.request()
        .input('id_tours', sql.Int, id_tours)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Tour;
