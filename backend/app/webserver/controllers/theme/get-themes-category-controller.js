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

async function getThemesFilter(req, res, next) {
  const { category } = req.params;
  const { userId } = req.claims;
  const themeData = {
    category,
    userId
  };

  const categoryCap = category.charAt(0).toUpperCase() + category.slice(1);

  try {
    await validate(themeData);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  let connection;
  try {
    const sqlQuery = `SELECT t.id, t.title, t.content, t.created_at, t.updated_at, t.category, u.name, u.first_name, u.id AS user
    FROM theme t JOIN user u ON t.user_id = u.id WHERE category = ? ORDER BY t.created_at DESC`;
    connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [categoryCap]);
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

module.exports = getThemesFilter;
