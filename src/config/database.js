require('dotenv').config();

module.exports = {
    development: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER,
        database: 'support_analytics',
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
    },
    production: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER,
        database: 'support_analytics',
        options: {
            encrypt: true
        }
    }
};