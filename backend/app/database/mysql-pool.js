'use strict';

const mysql = require('mysql2/promise');

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_DATABASE,
} = process.env;

let pool = null;

async function connect() {
  const options = {
    connectionLimit: 10,
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    port: MYSQL_PORT,
    timezone: 'Z',
    // debug: true,
    // multipleStatements: true,
  };

  /**
   * Create connection pool
   */
  pool = mysql.createPool(options);

  try {
    const connection = await pool.getConnection();
    connection.release();
  } catch (e) {
    console.error('mysql pool connect', e);
    throw e;
  }
}

async function getConnection() {
  if (pool === null) {
    throw new Error("MySQL connection didn't established. You must connect first.");
  }

  const connection = await pool.getConnection();

  return connection;
}

module.exports = {
  connect,
  getConnection,
};
