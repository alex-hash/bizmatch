'use strict';
const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

async function validate(data) {
  const schema = Joi.object({
    category: Joi.string(),
    userId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required()
  });

  Joi.assert(data, schema);
}

async function getProjectsFilter(req, res, next) {
  const { category } = req.params;
  const { userId } = req.claims;
  const projectData = {
    category,
    userId
  };

  const categoryCap = category.charAt(0).toUpperCase() + category.slice(1);

  try {
    await validate(projectData);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  let connection;
  try {
    const sqlQuery = `SELECT t.id, t.title, t.subtitle, t.ubication, t.text, t.created_at, t.updated_at, t.category, u.name, u.first_name, u.id AS user
    FROM project t JOIN user u ON t.user_id = u.id WHERE category = ? ORDER BY t.created_at DESC`;
    connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [categoryCap]);
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
