const sql = require('mssql');
const pool = require("../config/db");

class Paquete {
  constructor(id, nombre, valor, descripcion) {
    this.id = id;
    this.nombre = nombre;
    this.valor = valor;
    this.descripcion = descripcion;
  }

  static get tableName() {
    return 'paquetes';
  }

  static get columns() {
    return [
      'id',
      'nombre',
      'valor',
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

  static async create(paquete) {
    const query = `INSERT INTO ${this.tableName} (nombre, valor, descripcion) VALUES (@nombre, @valor, @descripcion)`;
    try {
      const result = await pool.request()
        .input('nombre', sql.VarChar, paquete.nombre)
        .input('valor', sql.Decimal, paquete.valor)
        .input('descripcion', sql.VarChar, paquete.descripcion)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async update(paquete) {
    const query = `UPDATE ${this.tableName} SET nombre = @nombre, valor = @valor, descripcion = @descripcion WHERE id = @id`;
    try {
      const result = await pool.request()
        .input('id', sql.Int, paquete.id)
        .input('nombre', sql.VarChar, paquete.nombre)
        .input('valor', sql.Decimal, paquete.valor)
        .input('descripcion', sql.VarChar, paquete.descripcion)
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

module.exports = Paquete;
