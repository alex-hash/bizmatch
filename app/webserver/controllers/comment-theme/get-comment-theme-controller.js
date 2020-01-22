'use strict';
const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

async function validate(data) {
  const schema = Joi.object({
    themeId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required()
  });

  Joi.assert(data, schema);
}

async function getCommentTheme(req, res, next) {
  const { themeId } = req.params;
  const commentData = { themeId };

  try {
    await validate(commentData);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  let connection;
  try {
    const sqlQuery = `select c.text, c.created_at, c.updated_at, c.deleted_at, c.theme_id, u.first_name, u.last_name, u.avatar_url
from comment_theme c JOIN user u ON c.user_id = u.id
      AND c.theme_id = ? AND c.deleted_at IS NULL`;
    const connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [themeId]);
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

module.exports = getCommentTheme;
