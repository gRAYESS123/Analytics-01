require('dotenv').config();

module.exports = {
    development: {
        user: process.env.DB_USER || 'sa',
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER || 'localhost',  // Using default instance
        database: 'support_analytics',
        options: {
            encrypt: true,
            trustServerCertificate: true,
            instanceName: 'MSSQLSERVER'  // Specifying the correct instance
        }
    },
    production: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER,
        database: 'support_analytics',
        options: {
            encrypt: true,
            instanceName: 'MSSQLSERVER'
        }
    }
};