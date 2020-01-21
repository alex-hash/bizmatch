'use strict';

const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

async function validateUpdate(data) {
  const schema = Joi.object({
    type: Joi.number().required(),
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

async function updateAssesment(req, res, next) {
  const assesmentData = { ...req.body };
  const { projectId } = req.params;
  const { userId } = req.claims;
  try {
    const data = {
      ...assesmentData,
      projectId,
      userId
    };
    await validateUpdate(data);
  } catch (e) {
    return res.status(400).send(e);
  }

  let connection;
  try {
    connection = await mysqlPool.getConnection();
    const updatedAt = new Date()
      .toISOString()
      .substring(0, 19)
      .replace('T', ' ');
    const sqlUpdateAssesment = `Update assesment
    SET type = ?, modified_at = ?
    WHERE id = ?
    AND user_id = ?`;
    const [updatedStatus] = await connection.query(sqlUpdateAssesment, [
      assesmentData.type,
      updatedAt,
      projectId,
      userId
    ]);
    connection.release();
    if (updatedStatus.affectedRows !== 1) {
      return res.status(404).send();
    }

    return res.status(204).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }

    console.error(e);
    return res.status(500).send({
      message: e.message
    });
  }
}

module.exports = updateAssesment;
