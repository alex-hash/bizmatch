'use strict';

const mysqlPool = require('../../../database/mysql-pool');

async function getComment(req, res, next) {
  const { projectId } = req.params;

  let connection;
  try {
    const sqlQuery = `select c.text, c.created_at, c.updated_at, c.deleted_at, c.project_id, u.first_name, u.last_name, u.avatar_url
from comment c JOIN user u ON c.user_id = u.id
      AND c.project_id = ?`;
    const connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [projectId]);
    connection.release();
    const comments = rows.map((comment) => {
      return {
        ...comment
      };
    });

    return res.send({
      data: comments
    });
  } catch (e) {
    if (connection) {
      connection.release();
    }
    console.error(e);
    res.status(500).send(e);
  }
}

module.exports = getComment;
