const { pool } = require("../config/db");

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
    const query = `SELECT * FROM ${this.tableName} WHERE id_servicio = ${id}`; 
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

  static async create(servicio) {
    const query = `INSERT INTO ${this.tableName} (id_servicio, nombre, precio, categoria) VALUES (?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      pool.execute(
        query,
        [servicio.id_servicio, servicio.nombre, servicio.precio, servicio.categoria],
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

  static async update(servicio) {
    const query = `UPDATE ${this.tableName} SET nombre = ?, precio = ?, categoria = ? WHERE id_servicio = ?`; 
    return new Promise((resolve, reject) => {
      pool.execute(
        query,
        [servicio.nombre, servicio.precio, servicio.categoria, servicio.id_servicio],
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

  static async delete(id_servicio) {
    const query = `DELETE FROM ${this.tableName} WHERE id_servicio = ?`; 
    return new Promise((resolve, reject) => {
      pool.execute(query, [id_servicio], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

module.exports = Servicio;
