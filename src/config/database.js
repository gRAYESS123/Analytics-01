require('dotenv').config();

module.exports = {
    development: {
        user: process.env.DB_USER || 'sa',
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER || 'localhost',
        database: 'support_analytics',
        options: {
            encrypt: true,
            trustServerCertificate: true,  // This allows us to bypass the certificate check
            instanceName: 'MSSQLSERVER'
        }
    }
};