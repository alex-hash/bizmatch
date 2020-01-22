'use strict';
const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

async function validate(data) {
  const schema = Joi.object({
    user_id: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required()
  });

  Joi.assert(data, schema);
}

async function getMessagesUser(req, res, next) {
  const { userId } = req.claims;
  const messageData = { userId };

  try {
    await validate(messageData);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  let connection;
  try {
    const sqlQuery = `SELECT content, MAX(created_at) AS created_at, origin_id, destination_id, conversation
        FROM message
        WHERE origin_id = ? OR destination_id = ?
        GROUP BY conversation
        ORDER BY created_at DESC`;

    connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [userId, userId]);
    connection.release();

    return res.send({
      data: rows
    });
  } catch (e) {
    if (connection) {
      connection.release();
    }
    console.error(e);
    return send.status(500).send();
  }
}

module.exports = getMessagesUser;
