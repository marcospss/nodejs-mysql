'use strict';

const mysql = require('mysql');
const ENV = process.env.ENV;
let conn = null;

function connectionFactory() {
    // https://github.com/mysqljs/mysql#connection-options
    return mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: (ENV === 'dev') ? 'api-portfolio-test' : 'api-portfolio'
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

module.exports = function() {
    return connectionFactory;
}