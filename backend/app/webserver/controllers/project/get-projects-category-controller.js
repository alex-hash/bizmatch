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

async function getProjectsFilter(req, res, next) {
  
  const user = req.params.userId
  let userId;
  if(user === undefined){
        userId = req.claims.userId
  }else{
        userId = req.params.userId
  }
  const projectData = {
    userId
  };

  try {
    await validate(projectData);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  let connection;
  try {
    const sqlQuery = `SELECT t.id, t.title, t.subtitle, t.created_at, t.updated_at, t.category, t.text, t.ubication, t.image_url, u.name, u.first_name, u.id AS user, u.avatar_url
    FROM project t JOIN user u ON t.user_id = u.id WHERE u.id = ? ORDER BY t.created_at DESC`;
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

module.exports = getProjectsFilter;
