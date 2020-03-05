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

async function getProject(req, res, next) {
  const { projectId } = req.params;

  const projectData = {
    projectId
  };

  try {
    await validate(projectData);
  } catch (e) {
    return res.status(400).send(e);
  }

  let connection;
  try {
    const sqlQuery = `select p.id, p.title, p.subtitle, p.category, p.ubication, p.image_url, p.text, p.created_at, p.updated_at, p.user_id AS user, u.name, u.first_name, u.last_name, u.avatar_url, u.description, AVG(a.type) as avg, count(a.type) as counter
    from project p JOIN user u ON p.user_id = u.id LEFT JOIN assesment a ON p.id = a.project_id WHERE p.id = ? `;

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
