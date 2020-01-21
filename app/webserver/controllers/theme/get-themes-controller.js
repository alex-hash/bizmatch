'use strict';

const mysqlPool = require('../../../database/mysql-pool');

async function getThemes(req, res, next) {
  const { userId } = req.claims;

  let connection;
  try {
    const sqlQuery = `SELECT *
      FROM theme
      WHERE user_id = ?`;
    const connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [userId]);
    connection.release();

    const projects = rows.map((project) => {
      return {
        ...project
      };
    });

    return res.status(200).send(projects);
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
}

module.exports = getThemes;
