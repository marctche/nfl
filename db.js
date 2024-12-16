require('dotenv').config({path:'./database_info.env'});

const { Pool } = require('pg'); // Import the PostgreSQL client

const pool = new Pool({
    user: process.env.DB_USER,       // Database username
    host: process.env.DB_HOST,       // Database hostname (e.g., localhost)
    database: process.env.DB_DATABASE, // Database name (e.g., nfl_stats)
    password: process.env.DB_PASSWORD, // Database password
    port: process.env.DB_PORT,         // Database port (default is 5432)
});

module.exports = pool; // Export the pool to be used in other files