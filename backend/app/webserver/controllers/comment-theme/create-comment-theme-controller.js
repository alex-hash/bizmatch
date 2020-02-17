'use strict';

const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');
const uuidV4 = require('uuid/v4');

async function validate(data) {
  const schema = Joi.object({
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

async function createCommentTheme(req, res, next) {
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
    console.error(e);
    res.status(400).send(e);
  }

  const now = new Date();
  const createdAtNow = now
    .toISOString()
    .replace('T', ' ')
    .substring(0, 19);
  const commentId = uuidV4();

  let connection;
  try {
    connection = await mysqlPool.getConnection();
    await connection.query('INSERT INTO comment_theme SET ?', {
      id: commentId,
      text: commentData.text,
      created_at: createdAtNow,
      user_id: userId,
      theme_id: themeId
    });
    connection.release();
    res.status(201).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }
    console.error(e);
    res.status(500).send(e);
  }
}

module.exports = createCommentTheme;
