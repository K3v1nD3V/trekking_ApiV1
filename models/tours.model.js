const { pool } = require("../config/db");

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
    const query = `SELECT * FROM ${this.tableName} WHERE id = ${id}`;
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

  static async create(tour) {
    const query = `INSERT INTO ${this.tableName} (id_paquete, descripcion) VALUES (?, ?)`;
    pool.execute(query, [tour.idPaquete, tour.descripcion]);
  }

  static async update(tour) {
    const query = `UPDATE ${this.tableName} SET id_paquete = ?, descripcion = ? WHERE id = ${tour.id}`;
    pool.execute(query, [tour.idPaquete, tour.descripcion]);
  }

  static async delete(id) {
    pool.execute(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
  }
}

module.exports = Tour;
