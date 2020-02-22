'use strict';
const mysqlPool = require('../../../database/mysql-pool');

async function getProjectsInit(req, res, next) {
  let connection;
  try {
    const sqlQuery = `SELECT t.id, t.title, t.subtitle, t.created_at, t.updated_at, t.category, t.text, t.ubication, t.image_url, u.name, u.first_name, u.id AS user, u.avatar_url
      FROM project t JOIN user u ON t.user_id = u.id ORDER BY t.created_at DESC LIMIT 3`;
    connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery);
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

module.exports = getProjectsInit;
