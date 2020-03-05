'use strict';
const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

async function validate(data) {
    const schema = Joi.object({
      patron: Joi.string().required()
    });
  
    Joi.assert(data, schema);
  }

async function getUsersSearch(req, res, next) {
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
    const sqlQuery = `SELECT id AS identify , email, name, first_name, last_name, birthday, avatar_url, company_name, company_role, page_url, type, created_at, description
    FROM user WHERE name LIKE ? OR first_name LIKE ? GROUP BY id ORDER BY name ASC LIMIT 3`;
    connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [`%${patron}%`, `%${patron}%`]);
    connection.release();

    const users = rows.map((user) => {
      return {
        ...user
      };
    });

    return res.status(200).send(users);
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
}

module.exports = getUsersSearch;
