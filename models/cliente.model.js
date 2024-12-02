const sql = require('mssql');
const pool = require("../config/db");

class Cliente {
  constructor(id_cliente, nombre, apellido, correo, telefono) {
    this.id_cliente = id_cliente;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.telefono = telefono;
  }

  static get tableName() {
    return 'clientes';
  }

  static get columns() {
    return [
      'id_cliente',
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
    const query = `SELECT * FROM ${this.tableName} WHERE id_cliente = @id_cliente`;
    try {
      const result = await pool.request()
        .input('id_cliente', sql.Int, id)
        .query(query);
      return result.recordset[0];
    } catch (err) {
      throw err;
    }
  }

  static async create(cliente) {
    const query = `INSERT INTO ${this.tableName} (nombre, apellido, correo, telefono) VALUES (@nombre, @apellido, @correo, @telefono)`;
    try {
      const result = await pool.request()
        .input('nombre', sql.VarChar, cliente.nombre)
        .input('apellido', sql.VarChar, cliente.apellido)
        .input('correo', sql.VarChar, cliente.correo)
        .input('telefono', sql.VarChar, cliente.telefono)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async update(cliente) {
    const query = `UPDATE ${this.tableName} SET nombre = @nombre, apellido = @apellido, correo = @correo, telefono = @telefono WHERE id_cliente = @id_cliente`;
    try {
      const result = await pool.request()
        .input('id_cliente', sql.Int, cliente.id_cliente)
        .input('nombre', sql.VarChar, cliente.nombre)
        .input('apellido', sql.VarChar, cliente.apellido)
        .input('correo', sql.VarChar, cliente.correo)
        .input('telefono', sql.VarChar, cliente.telefono)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async delete(id_cliente) {
    const query = `DELETE FROM ${this.tableName} WHERE id_cliente = @id_cliente`;
    try {
      const result = await pool.request()
        .input('id_cliente', sql.Int, id_cliente)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Cliente;
