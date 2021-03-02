require('dotenv').config(); // pulls our environemnt variables in

//Initializes 5 connections that can be used in the project. Just a threadpool
const mysql = require('mysql');
var connectionPool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.SCHEMA,
    port: process.env.PORT,
    debug: false

})


//Exports our connection pool to use in our project
module.exports = connectionPool;