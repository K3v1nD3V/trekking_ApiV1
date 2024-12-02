const mysql = require('mysql2/promise');

const config = {
    host: 'localhost',
    database: 'trekkingv1',
    user: 'root',
    password: ''
};

const pool = mysql.createPool(config);

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión exitosa a la base de datos');
        connection.release();
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
    }
}

testConnection();

module.exports = pool;
