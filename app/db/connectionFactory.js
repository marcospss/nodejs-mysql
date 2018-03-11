'use strict';

const mysql = require('mysql');
let conn = null;

function connectionFactory() {
    // https://github.com/mysqljs/mysql#connection-options
    return mysql.createPool({
        connectionLimit: 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    });
}

function closeConnection() {
    conn.end(function(err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
    });
}

module.exports = () => connectionFactory;