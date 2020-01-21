'use strict';

const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');
const uuidV4 = require('uuid/v4');

async function validateComment(data) {
  const schema = Joi.object({
    text: Joi.string().required()
  });

  Joi.assert(data, schema);
}

async function createComment(req, res, next) {
  const commentData = { ...req.body };
  const { userId } = req.claims;
  const { projectId } = req.params;

  try {
    await validateComment(commentData);
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
    await connection.query('INSERT INTO comment SET ?', {
      id: commentId,
      text: commentData.text,
      created_at: createdAtNow,
      user_id: userId,
      project_id: projectId
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

module.exports = createComment;
