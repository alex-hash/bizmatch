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

async function deleteBizmatch(req, res, next) {
  const { userId } = req.claims;
  const bizmatchData = { userId, ...req.body };

  try {
    await validate(bizmatchData);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  let connection;
  try {
    connection = await mysqlPool.connection();
    const sqlQuery = `DELETE FROM bizmatch WHERE user_id = ? AND project_id = ?`;
    const [deletedStatus] = await connection.execute(sqlQuery, [user_id, bizmatchData.project_id]);
    if (deletedStatus.affectedRows !== 1) {
      return res.status(404).send();
    }

    return res.status(204).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }
    return res.status(500).send(e.message);
  }
}

module.exports = deleteBizmatch;
