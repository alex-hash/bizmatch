'use strict';

const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

async function validate(data) {
  const schema = Joi.object({
    conversation: Joi.string().required()
  });

  Joi.assert(data, schema);
}

async function getConversation(req, res, next) {
  const conversationData = { ...req.body };
  const conversationId = conversationData.conversation;

  try {
    await validate(conversationData);
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }

  let connection;
  try {
    const sqlQuery = `SELECT content, origin_id, destination_id, created_at
        FROM message
        WHERE conversation = ?`;

    connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [conversationId]);
    connection.release();

    return res.send({
      data: rows
    });
  } catch (e) {
    if (connection) {
      connection.release();
    }
    console.error(e);
    res.status(500).send(e);
  }
}

module.exports = getConversation;
