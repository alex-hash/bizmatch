'use strict';
const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

async function validate(data) {
  const schema = Joi.object({
    id: Joi.string()
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
  const commentData = { ...req.body };
  const { userId } = req.claims;

  try {
    const data = {
      ...commentData,
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
    const sqlQuery = `UPDATE comment_theme
    SET deleted_at = ?
      WHERE id = ?
      AND user_id = ?
      AND deleted_at IS NULL`;
    const now = new Date()
      .toISOString()
      .substring(0, 19)
      .replace('T', ' ');
    const [deletedStatus] = await connection.execute(sqlQuery, [now, commentData.id, userId]);
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
