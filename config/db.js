const sql = require('mssql');

const config = {
    server: process.env.DB_SERVER, 
    database: process.env.DB_DATABASE, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: true, // Usar la conexión encriptada
        trustServerCertificate: false, // Ajusta según tus necesidades
        enableArithAbort: true
    }
};

const pool = new sql.ConnectionPool(config);

pool.connect(err => {
    if (err) {
        console.error('Database connection failed!', err);
    } else {
        console.log('Database connected successfully');
    }
});

module.exports = pool;
