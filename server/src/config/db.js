const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'shareholderUser1',
    password : 'password',
    database : 'shareholders'
  });
  
connection.connect();

module.exports = connection;