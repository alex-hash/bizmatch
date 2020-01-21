'use strict';

const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');
const uuidV4 = require('uuid/v4');

async function validateProject(data) {
  const schema = Joi.object({
    title: Joi.string()
      .trim()
      .min(1)
      .max(60)
      .required(),

    content: Joi.string()
      .trim()
      .min(1)
      .max(135)
      .required(),
    project_name: Joi.string()
      .required()
      .trim()
      .min(1)
      .max(60)
  });

  Joi.assert(data, schema);
}

async function createTheme(req, res, next) {
  const themeData = { ...req.body };
  const { userId } = req.claims;
  try {
    const data = {
      ...themeData
    };
    await validateProject(data);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  const createdAt = new Date()
    .toISOString()
    .substring(0, 19)
    .replace('T', ' ');
  const themeId = uuidV4();

  let connection;
  try {
    connection = await mysqlPool.getConnection();
    await connection.query('INSERT INTO theme SET ?', {
      id: themeId,
      title: themeData.title,

      content: themeData.content,
      project_name: themeData.project_name,
      created_at: createdAt,
      user_id: userId
    });
    connection.release();

    res.status(201).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }
    console.error(e);
    res.status(500).send(e);
  }
}

module.exports = createTheme;
