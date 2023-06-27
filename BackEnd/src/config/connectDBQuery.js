var mysql = require('mysql2');

var connectQuery = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Angelanh5@gmail.com',
    database: 'quanlykhoahoc',
}).promise();

module.exports = connectQuery;