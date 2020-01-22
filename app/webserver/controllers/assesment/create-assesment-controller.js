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
    projectId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required()
  });

  Joi.assert(data, schema);
}

async function createAssesment(req, res, next) {
  const assesmentData = { ...req.body };
  const { userId } = req.claims;
  const { projectId } = req.params;

  try {
    const data = {
      ...assesmentData,
      userId,
      projectId
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
    await connection.query('INSERT INTO assesment SET ?', {
      id: assesmentId,
      type: assesmentData.type,
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

module.exports = createAssesment;
