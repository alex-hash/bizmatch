'use strict';

const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

async function validate(data) {
  const schema = Joi.object({
    projectId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required()
  });

  Joi.assert(data, schema);
}

async function deleteProject(req, res, next) {
  const { projectId } = req.params;
  try {
    await validate({ projectId });
  } catch (e) {
    return res.status(400).send(e);
  }

  let connection;
  try {
    connection = await mysqlPool.getConnection();
    const sqlQueryC = `DELETE FROM comment WHERE project_id = ?`;

    const [deletedStatusC] = await connection.execute(sqlQueryC, [projectId]);
    connection = await mysqlPool.getConnection();
    const sqlQuery = `DELETE FROM project
      WHERE id = ?`;

    const [deletedStatus] = await connection.execute(sqlQuery, [projectId]);
    connection.release();

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

module.exports = deleteProject;
