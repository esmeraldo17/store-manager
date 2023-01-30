require('dotenv').config();

const { createPool } = require('mysql2/promise');

const connection = createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'senha',
  database: process.env.MYSQL_DATABASE || 'StoreManager',
  port: process.env.MYSQL_PORT || 3306,
});

module.exports = connection;