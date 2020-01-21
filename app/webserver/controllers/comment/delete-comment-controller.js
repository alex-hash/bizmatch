'use strict';

const mysqlPool = require('../../../database/mysql-pool');

async function deleteComment(req, res, next) {
  const { commentId } = req.params;
  const { userId } = req.claims;

  let connection;
  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = `UPDATE comment
    SET deleted_at = ?
      WHERE id = ?
      AND user_id = ?
      AND deleted_at IS NULL`;
    const now = new Date()
      .toISOString()
      .substring(0, 19)
      .replace('T', ' ');
    const [deletedStatus] = await connection.execute(sqlQuery, [now, commentId, userId]);
    connection.release();
    if (deletedStatus.affectedRows !== 1) {
      return res.status(404).send();
    }

    return res.status(204).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }

    return res.status(500).send(e.message);
  }
}

module.exports = deleteComment;
