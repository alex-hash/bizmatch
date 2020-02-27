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

async function getProjects(req, res, next) {
  const user = req.params.userId
  let userId;
  if(user === undefined){
        userId = req.claims.userId
  }else{
        userId = req.params.userId
  }
  const projectData = { userId };

  try {
    await validate(projectData);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  let connection;
  try {
    const sqlQuery = `SELECT id, title, subtitle, created_at, updated_at, category, text, ubication, image_url FROM project WHERE user_id = ? LIMIT 2`;
    connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [userId]);
    connection.release();

    const projects = rows.map((project) => {
      return {
        ...project
      };
    });

    return res.status(200).send(projects);
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
}

module.exports = getProjects;
