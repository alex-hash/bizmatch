'use strict';
const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

async function validate(data) {
  const schema = Joi.object({
    userId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required()
  });

  Joi.assert(data, schema);
}

async function getComment(req, res, next) {

  const user = req.params.userId
  let userId;
  if(user === undefined){
        userId = req.claims.userId
  }else{
        userId = req.params.userId
  }
  const commentData = { userId };

  try {
    await validate(commentData);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  let connection;
  try {
    const sqlQuery = `select c.text, p.id as project, p.title from comment c JOIN project p ON c.project_id = p.id where c.user_id = ? LIMIT 2`;
    const connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [userId]);
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

module.exports = getComment;
