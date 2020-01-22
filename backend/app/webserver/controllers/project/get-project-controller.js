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

async function getProject(req, res, next) {
  const { userId } = req.claims;
  const { projectId } = req.params;

  const projectData = {
    userId,
    projectId
  };

  try {
    await validate(projectData);
  } catch (e) {
    return res.status(400).send(e);
  }

  let connection;
  try {
    const sqlQuery = `SELECT *
      FROM project
      WHERE id = ?`;

    connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [projectId]);
    connection.release();

    if(rows.length !== 1){
      return res.status(404).send();
    }

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

module.exports = getProject;
