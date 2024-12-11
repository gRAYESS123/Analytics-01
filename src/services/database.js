const sql = require('mssql');

// Database configuration
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: 'support_analytics',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// Create connection pool
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

pool.on('error', err => {
    console.error('SQL Pool Error:', err);
});

async function executeQuery(query) {
    try {
        await poolConnect;
        const request = pool.request();
        const result = await request.query(query);
        return result.recordset;
    } catch (err) {
        console.error('Database Error:', err);
        throw err;
    }
}

async function executeStoredProcedure(procedureName, parameters = {}) {
    try {
        await poolConnect;
        const request = pool.request();
        
        // Add parameters to the request
        Object.entries(parameters).forEach(([key, value]) => {
            request.input(key, value);
        });

        const result = await request.execute(procedureName);
        return result.recordset;
    } catch (err) {
        console.error('Stored Procedure Error:', err);
        throw err;
    }
}

module.exports = {
    executeQuery,
    executeStoredProcedure,
    pool
};