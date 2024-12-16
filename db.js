require('dotenv').config({path:'./database.info.env'});

const {Pool} = require('pg');

const pool = new Pool({

    user: process.env.DB_User,
    host: process.env.DB_Host,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,

});

module.exports = pool;