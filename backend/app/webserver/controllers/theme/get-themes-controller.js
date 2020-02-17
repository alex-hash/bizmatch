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

async function getThemes(req, res, next) {
  const { userId } = req.claims;
  const themeData = { userId };

  try {
    await validate(themeData);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  let connection;
  try {
    const sqlQuery = `SELECT t.id, t.title, t.content, t.created_at, t.updated_at, t.category, u.name, u.first_name, u.id AS user
      FROM theme t JOIN user u ON t.user_id = u.id ORDER BY t.created_at DESC`;
    connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [userId]);
    connection.release();

    const themes = rows.map((theme) => {
      return {
        ...theme
      };
    });

    return res.status(200).send(themes);
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
}

module.exports = getThemes;
