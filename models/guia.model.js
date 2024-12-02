const { pool } = require("../config/db");

class Guia {
  constructor(id_guia, nombre, apellido, correo, telefono) {
    this.id_guia = id_guia;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.telefono = telefono;
  }

  static get tableName() {
    return 'guias';
  }

  static get columns() {
    return [
      'id_guia',
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
    const query = `SELECT * FROM ${this.tableName} WHERE id_guia = ${id}`; // Corregido `id_guia` -> `id`
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

  static async create(guia) {
    const query = `INSERT INTO ${this.tableName} (id_guia, nombre, apellido, correo, telefono) VALUES (?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      pool.execute(
        query,
        [guia.id_guia, guia.nombre, guia.apellido, guia.correo, guia.telefono],
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

  static async update(guia) {
    const query = `UPDATE ${this.tableName} SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE id_guia = ?`; // Corregido `id` -> `id_guia`
    return new Promise((resolve, reject) => {
      pool.execute(
        query,
        [guia.nombre, guia.apellido, guia.correo, guia.telefono, guia.id_guia],
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

  static async delete(id_guia) {
    const query = `DELETE FROM ${this.tableName} WHERE id_guia = ?`; // Corregido clave `id` -> `id_guia`
    return new Promise((resolve, reject) => {
      pool.execute(query, [id_guia], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

module.exports = Guia;
