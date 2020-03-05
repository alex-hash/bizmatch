'use strict';
const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

async function validate(data) {
    const schema = Joi.object({
      patron: Joi.string().required()
    });
  
    Joi.assert(data, schema);
  }

async function getProjectsSearch(req, res, next) {
  const patron = req.params.patron;
  const filterData = { patron };
  try {
    await validate(filterData);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }
  let connection;
  try {
    const sqlQuery = `SELECT t.id, t.title, t.subtitle, t.created_at, t.updated_at, t.category, t.text, t.ubication, t.image_url, u.name, u.first_name, u.id AS user, u.avatar_url, AVG(a.type) as avg, count(a.type) as counter
    FROM project t LEFT JOIN assesment a ON t.id = a.project_id JOIN user u ON u.id=t.user_id WHERE t.title LIKE ? GROUP BY t.id ORDER BY AVG(a.type) DESC, count(a.type) DESC LIMIT 3`;
    connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [`%${patron}%`]);
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

module.exports = getProjectsSearch;
