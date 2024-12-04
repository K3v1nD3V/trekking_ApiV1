const sql = require('mssql');
const pool = require("../config/db");

class Paquete {
  constructor(id_paquetes, nombre, valor, descripcion) {
    this.id_paquetes = id_paquetes;
    this.nombre = nombre;
    this.valor = valor;
    this.descripcion = descripcion;
  }

  static get tableName() {
    return 'paquetes';
  }

  static get columns() {
    return [
      'id_paquetes',
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
  
  static async findById(id_paquetes) {
    const query = `SELECT * FROM ${this.tableName} WHERE id_paquetes = @id_paquetes`;
    try {
      const result = await pool.request()
        .input('id_paquetes', sql.Int, id_paquetes)
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

      const createdPaquete = await pool.request().query('SELECT @@IDENTITY AS id_paquetes');
      return { id_paquetes: createdPaquete.recordset[0].id_paquetes, ...paquete };
    } catch (err) {
      throw err;
    }
  }

  static async update(paquete) {
    const query = `UPDATE ${this.tableName} SET nombre = @nombre, valor = @valor, descripcion = @descripcion WHERE id_paquetes = @id_paquetes`;
    try {
      const result = await pool.request()
        .input('id_paquetes', sql.Int, paquete.id_paquetes)
        .input('nombre', sql.VarChar, paquete.nombre)
        .input('valor', sql.Decimal, paquete.valor)
        .input('descripcion', sql.VarChar, paquete.descripcion)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async delete(id_paquetes) {
    const query = `DELETE FROM ${this.tableName} WHERE id_paquetes = @id_paquetes`;
    try {
      const result = await pool.request()
        .input('id_paquetes', sql.Int, id_paquetes)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Paquete;
