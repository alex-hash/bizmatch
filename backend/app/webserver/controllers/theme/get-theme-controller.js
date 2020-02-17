'use strict';
const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

async function validate(data) {
  const schema = Joi.object({
    themeId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required(),
    userId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required()
  });

  Joi.assert(data, schema);
}

async function getTheme(req, res, next) {
  const { themeId } = req.params;
  const { userId } = req.claims;

  const themeData = {
    themeId,
    userId
  };

  try {
    await validate(themeData);
  } catch (e) {
    return res.status(400).send(e);
  }

  let connection;
  try {
    const sqlQuery = `SELECT *
      FROM theme
      WHERE id = ?`;

    connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [themeId]);
    connection.release();

    return res.send({
      data: rows
    });
  } catch (e) {
    if (connection) {
      connection.release();
    }
    console.error(e);
    return send.status(500).send();
  }
}

module.exports = getTheme;
