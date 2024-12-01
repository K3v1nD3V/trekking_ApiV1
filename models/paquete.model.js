const { pool } = require("../config/db");

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
    return new Promise((resolve, reject) => {
      pool.execute(query, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      });
    })
  }
  
  static async findById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ${id}`;
    return new Promise((resolve, reject) => {
      pool.execute(query, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      });
    })
  }

  static async create(paquete) {
    const query = `INSERT INTO ${this.tableName} (nombre, valor, descripcion) VALUES (?, ?, ?)`;
    pool.execute(query, [paquete.nombre, paquete.valor, paquete.descripcion]);
  }
  static async update(paquete) {
    const query = `UPDATE ${this.tableName} SET nombre = ?, valor = ?, descripcion = ? WHERE id = ${paquete.id}`;
    pool.execute(query, [paquete.nombre, paquete.valor, paquete.descripcion]);
  }

  static async delete(id) {
    pool.execute(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
  }
}

module.exports = Paquete;