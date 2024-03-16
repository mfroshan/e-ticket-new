const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'railway_eticket',
});

connection.connect();

module.exports = connection;
