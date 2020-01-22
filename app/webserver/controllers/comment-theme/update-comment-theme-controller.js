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
    text: Joi.string().required(),
    userId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required(),
    themeId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required()
  });

  Joi.assert(data, schema);
}

async function updateCommentTheme(req, res, next) {
  const commentData = { ...req.body };
  const { userId } = req.claims;
  const { themeId } = req.params;

  try {
    const data = {
      ...commentData,
      userId,
      themeId
    };
    await validate(data);
  } catch (e) {
    return res.status(400).send(e);
  }

  let connection;
  try {
    connection = await mysqlPool.getConnection();
    const updatedAt = new Date()
      .toISOString()
      .substring(0, 19)
      .replace('T', ' ');
    const sqlUpdateComment = `Update comment_theme
    SET text = ?, updated_at = ?
    WHERE id = ?`;
    const [updatedStatus] = await connection.query(sqlUpdateComment, [commentData.text, updatedAt, commentData.id]);
    connection.release();
    if (updatedStatus.affectedRows !== 1) {
      return res.status(404).send();
    }

    return res.status(204).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }

    console.error(e);
    return res.status(500).send({
      message: e.message
    });
  }
}

module.exports = updateCommentTheme;
