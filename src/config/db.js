const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'sholder1',
    password : 'password',
    database : 'sholders'
  });
  
connection.connect();

module.exports = connection;