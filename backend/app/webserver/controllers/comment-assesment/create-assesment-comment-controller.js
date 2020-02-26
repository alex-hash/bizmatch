'use strict';

const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');
const uuidV4 = require('uuid/v4');

async function validate(data) {
  const schema = Joi.object({
    type: Joi.number().required(),
    userId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required(),
    commentId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required()
  });

  Joi.assert(data, schema);
}

async function createCommentAssesment(req, res, next) {
  const assesmentData = { ...req.body };
  const { userId } = req.claims;
  const { commentId } = req.params;

  try {
    const data = {
      ...assesmentData,
      userId,
      commentId
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
  const assesmentId = uuidV4();

  let connection;
  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = `SELECT * FROM comment_assesment WHERE user_id = ? AND comment_id = ?`
    const [rows] = await connection.execute(sqlQuery, [userId, commentId]);
    if(rows.length === 1){
      const sqlQuery2 = `UPDATE comment_assesment SET type=?, updated_at=? WHERE user_id = ? AND comment_id = ?`;
      await connection.execute(sqlQuery2, [assesmentData.type, createdAtNow, userId, commentId]);
      connection.release();
      res.status(204).send();
    }else{
      await connection.query('INSERT INTO comment_assesment SET ?', {
        id: assesmentId,
        type: assesmentData.type,
        created_at: createdAtNow,
        user_id: userId,
        comment_id: commentId
      });
      connection.release();
      res.status(201).send();
    }
  } catch (e) {
    if (connection) {
      connection.release();
    }
    console.error(e);
    res.status(500).send(e);
  }
}

module.exports = createCommentAssesment;
