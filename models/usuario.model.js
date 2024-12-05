const sql = require('mssql');
const pool = require("../config/db");

class Usuario {
  constructor(id_usuario, user_name, email) {
    this.id_usuario = id_usuario;
    this.user_name = user_name;
    this.email = email;
  }

  static get tableName() {
    return 'usuarios';
  }

  static get columns() {
    return [
      'id_usuario',
      'user_name',
      'email'
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
    const query = `SELECT * FROM ${this.tableName} WHERE id_usuario = @id_usuario`;
    try {
      const result = await pool.request()
        .input('id_usuario', sql.Int, id)
        .query(query);
      return result.recordset[0];
    } catch (err) {
      throw err;
    }
  }

  static async create(usuario) {
    const query = `INSERT INTO ${this.tableName} (user_name, email) VALUES (@user_name, @email)`;
    try {
      const result = await pool.request()
        .input('user_name', sql.VarChar, usuario.user_name)
        .input('email', sql.VarChar, usuario.email)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async update(usuario) {
    const query = `UPDATE ${this.tableName} SET user_name = @user_name, email = @email WHERE id_usuario = @id_usuario`;
    try {
      const result = await pool.request()
        .input('id_usuario', sql.Int, usuario.id_usuario)
        .input('user_name', sql.VarChar, usuario.user_name)
        .input('email', sql.VarChar, usuario.email)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async delete(id_usuario) {
    const query = `DELETE FROM ${this.tableName} WHERE id_usuario = @id_usuario`;
    try {
      const result = await pool.request()
        .input('id_usuario', sql.Int, id_usuario)
        .query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Usuario;
