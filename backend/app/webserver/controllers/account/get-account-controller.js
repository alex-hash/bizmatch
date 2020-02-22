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

async function getUser(req, res, next) {
  const { userId } = req.claims;
  const accountData = { userId };

  try {
    await validate(accountData);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  let connection;
  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = `SELECT id AS identify , email, name, first_name, last_name, birthday, avatar_url, company_name, company_role, page_url, type, created_at, description
        FROM user WHERE id = ?`;
    const [rows] = await connection.execute(sqlQuery, [userId]);
    connection.release();

    if (rows.length !== 1) {
      return res.status(404).send();
    }

    const [userData] = rows;

    return res.send({
      data: userData
    });
  } catch (e) {
    if (connection) {
      connection.release();
    }

    console.error(e);
    return res.status(500).send();
  }
}

module.exports = getUser;
