const { pool } = require("../config/db");

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
    return new Promise((resolve, reject) => {
      pool.execute(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static async findById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id_cliente = ${id}`; 
    return new Promise((resolve, reject) => {
      pool.execute(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static async create(cliente) {
    const query = `INSERT INTO ${this.tableName} (id_cliente, nombre, apellido, correo, telefono) VALUES (?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      pool.execute(
        query,
        [cliente.id_cliente, cliente.nombre, cliente.apellido, cliente.correo, cliente.telefono],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  static async update(cliente) {
    const query = `UPDATE ${this.tableName} SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE id_cliente = ?`; 
    return new Promise((resolve, reject) => {
      pool.execute(
        query,
        [cliente.nombre, cliente.apellido, cliente.correo, cliente.telefono, cliente.id_cliente],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  static async delete(id_cliente) {
    const query = `DELETE FROM ${this.tableName} WHERE id_cliente = ?`; 
    return new Promise((resolve, reject) => {
      pool.execute(query, [id_cliente], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

module.exports = Cliente;
