'use strict';
const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

async function validate(data) {
  const schema = Joi.object({
    userId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required(),
      projectId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required()
  });

  Joi.assert(data, schema);
}

async function getCommentAssesment(req, res, next) {
  const { userId } = req.claims;
  const { projectId} = req.params
  const assesmentData = { userId, projectId };

  try {
    await validate(assesmentData);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  let connection;
  try {
    const sqlQuery = `SELECT c.id, ca.type
    FROM comment c JOIN comment_assesment ca ON c.id = ca.comment_id
    WHERE ca.user_id = ? AND c.project_id = ?`;

    const connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [userId, projectId]);
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

module.exports = getCommentAssesment;
