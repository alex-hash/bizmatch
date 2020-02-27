'use strict';
const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

async function validate(data) {
  const schema = Joi.object({
    commentId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required()
  });

  Joi.assert(data, schema);
}

async function getCommentAssesment(req, res, next) {
  const { commentId } = req.params;
  const { userId } = req.claims;
  const assesmentData = { commentId };

  try {
    await validate(assesmentData);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  let connection;
  try {
    const sqlQuery = `SELECT type 
      FROM comment_assesment
      WHERE comment_id= ? AND user_id = ?`;

    const connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [commentId, userId]);
    connection.release();

    return res.send({
      data: rows[0]
    });
  } catch (e) {
    if (connection) {
      connection.release();
    }
    console.error(e);
    res.status(500).send(e);
  }
}

module.exports = getCommentAssesment;
