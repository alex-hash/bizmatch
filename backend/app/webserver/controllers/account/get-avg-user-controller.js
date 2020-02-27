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

async function getAvg(req, res, next) {

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
    const sqlQuery = `select AVG(type) AS avg, count(*) AS counter from assesment a JOIN project p ON a.project_id = p.id WHERE p.user_id = ?`;
    const connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [userId]);
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

module.exports = getAvg;
