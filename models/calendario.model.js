const sql = require('mssql');
const pool = require("../config/db");

class Calendario {
  constructor(id, idGuia, fechaInicio, fechaFin, horaRecogida, lugar, asistentes) {
    this.id = id;
    this.idGuia = idGuia;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.horaRecogida = horaRecogida;
    this.lugar = lugar;
    this.asistentes = asistentes;
  }

  static get tableName() {
    return 'calendario';
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

  static async create(calendario) {
    const query = `
      INSERT INTO ${this.tableName} 
      (idGuia, fechaInicio, fechaFin, horaRecogida, lugar, asistentes) 
      VALUES 
      (@idGuia, @fechaInicio, @fechaFin, @horaRecogida, @lugar, @asistentes)
    `;
    try {
      const result = await pool.request()
        .input('idGuia', sql.Int, calendario.idGuia)
        .input('fechaInicio', sql.Date, calendario.fechaInicio)
        .input('fechaFin', sql.Date, calendario.fechaFin)
        .input('horaRecogida', sql.Time, calendario.horaRecogida)
        .input('lugar', sql.VarChar, calendario.lugar)
        .input('asistentes', sql.Int, calendario.asistentes || 0)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async update(calendario) {
    const query = `
      UPDATE ${this.tableName} 
      SET 
        idGuia = @idGuia, 
        fechaInicio = @fechaInicio, 
        fechaFin = @fechaFin, 
        horaRecogida = @horaRecogida, 
        lugar = @lugar, 
        asistentes = @asistentes 
      WHERE id = @id
    `;
    try {
      const result = await pool.request()
        .input('id', sql.Int, calendario.id)
        .input('idGuia', sql.Int, calendario.idGuia)
        .input('fechaInicio', sql.Date, calendario.fechaInicio)
        .input('fechaFin', sql.Date, calendario.fechaFin)
        .input('horaRecogida', sql.Time, calendario.horaRecogida)
        .input('lugar', sql.VarChar, calendario.lugar)
        .input('asistentes', sql.Int, calendario.asistentes || 0)
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

module.exports = Calendario;