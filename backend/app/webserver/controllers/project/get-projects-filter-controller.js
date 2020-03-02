'use strict';
const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

async function validate(data) {
  const schema = Joi.object({
    category: Joi.string().required(),
    location: Joi.string().required(),
    userId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required()
  });

  Joi.assert(data, schema);
}

async function getFilterProjects(req, res, next) {
  const { userId } = req.claims;
  const location = req.params.location;
  const category = req.params.category;
  const filterData = { category, location, userId };

  try {
    await validate(filterData);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  let connection;
  try {

    const sqlQueryC = `SELECT t.id, t.title, t.subtitle, t.created_at, t.updated_at, t.category, t.text, t.ubication, t.image_url, u.name, u.first_name, u.id AS user, u.avatar_url, AVG(a.type) as avg, count(a.type) as counter
    FROM project t LEFT JOIN assesment a ON t.id = a.project_id JOIN user u ON u.id=t.user_id WHERE category=? GROUP BY t.id ORDER BY t.created_at DESC`;
    const sqlQueryCL = `SELECT t.id, t.title, t.subtitle, t.created_at, t.updated_at, t.category, t.text, t.ubication, t.image_url, u.name, u.first_name, u.id AS user, u.avatar_url, AVG(a.type) as avg, count(a.type) as counter
    FROM project t LEFT JOIN assesment a ON t.id = a.project_id JOIN user u ON u.id=t.user_id WHERE category=? AND ubication = ? GROUP BY t.id ORDER BY t.created_at DESC`;
    const sqlQueryL = `SELECT t.id, t.title, t.subtitle, t.created_at, t.updated_at, t.category, t.text, t.ubication, t.image_url, u.name, u.first_name, u.id AS user, u.avatar_url, AVG(a.type) as avg, count(a.type) as counter
    FROM project t LEFT JOIN assesment a ON t.id = a.project_id JOIN user u ON u.id=t.user_id WHERE ubication = ? GROUP BY t.id ORDER BY t.created_at DESC`;
    const sqlQuery = `SELECT t.id, t.title, t.subtitle, t.created_at, t.updated_at, t.category, t.text, t.ubication, t.image_url, u.name, u.first_name, u.id AS user, u.avatar_url, AVG(a.type) as avg, count(a.type) as counter
    FROM project t LEFT JOIN assesment a ON t.id = a.project_id JOIN user u ON u.id=t.user_id GROUP BY t.id ORDER BY t.created_at DESC`;

    connection = await mysqlPool.getConnection();
    let rows;
    if(category === "Nada" && location === "Nada"){
        [rows] = await connection.execute(sqlQuery);
    }else if(location === "Nada"){
        [rows] = await connection.execute(sqlQueryC, [category]);
    }else if(category === "Nada"){
        [rows] = await connection.execute(sqlQueryL, [location]);
    }else{
        [rows] = await connection.execute(sqlQueryCL, [category, location]);
    }
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

module.exports = getFilterProjects;
