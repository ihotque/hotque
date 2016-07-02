var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hotque',
  database: 'hotque_api'
});

module.exports = connection;
