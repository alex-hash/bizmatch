'use strict';
const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

async function validate(data) {
  const schema = Joi.object({
    commentId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required(),
    userId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required()
  });

  Joi.assert(data, schema);
}

async function deleteCommentTheme(req, res, next) {
  const { commentId } = req.params;
  const { userId } = req.claims;

  try {
    const data = {
      commentId,
      userId
    };
    await validate(data);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  let connection;
  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = `DELETE FROM comment_theme WHERE id = ?`;
    const now = new Date()
      .toISOString()
      .substring(0, 19)
      .replace('T', ' ');
    const [deletedStatus] = await connection.execute(sqlQuery, [commentId]);
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

module.exports = deleteCommentTheme;
