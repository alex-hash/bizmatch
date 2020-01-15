"use strict";

const mysqlPool = require("../../../database/mysql-pool");

async function getProject(req, res, next) {
  const { userId } = req.claims;
  let connection;

  try {
    const sqlQuery = `SELECT *
      FROM tags
      WHERE user_id = ?`;

    connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [userId]);
    connection.release();

    return res.send({
      data: rows
    });
  } catch (e) {
    if (connection) {
      connection.release();
    }
    console.error(e);
    return send.status(500).send();
  }
}

module.exports = getProject;
