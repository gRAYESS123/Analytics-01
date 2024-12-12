const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

async function executeQuery(query) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {
        console.error('Database error:', err);
        throw err;
    }
}

module.exports = { executeQuery };