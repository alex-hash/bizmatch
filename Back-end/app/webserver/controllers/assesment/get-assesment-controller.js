'use strict';

const mysqlPool = require('../../../database/mysql-pool');

async function getAssesment(req, res, next) {
  const { projectId } = req.params;

  let connection;
  try {
    const sqlQuery = `SELECT AVG(type) AS media
      FROM assesment
      WHERE project_id= ?`;

    const connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [projectId]);
    connection.release();

    return res.send({
      data: rows[0]
    });
  } catch (e) {
    if (connection) {
      connection.release();
    }
    console.error(e);
    res.status(500).send(e);
  }
}

module.exports = getAssesment;
