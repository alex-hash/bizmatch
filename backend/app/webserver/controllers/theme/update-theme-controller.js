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
    title: Joi.string()
      .trim()
      .min(1)
      .max(60)
      .required(),
    category: Joi.string().required(),
    content: Joi.string()
      .trim()
      .min(1)
      .max(135)
      .required(),
    project_name: Joi.string()
      .required()
      .trim()
      .min(1)
      .max(60),
    userId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required()
  });

  Joi.assert(data, schema);
}

async function updateTheme(req, res, next) {
  const { themeId } = req.params;
  const themeData = { ...req.body };
  const { userId } = req.claims;
  try {
    const data = {
      themeId,
      ...themeData,
      userId
    };
    await validate(data);
  } catch (e) {
    return res.status(400).send(e);
  }

  let connection;
  try {
    connection = await mysqlPool.getConnection();
    const updatedAt = new Date()
      .toISOString()
      .substring(0, 19)
      .replace('T', ' ');
    const sqlUpdateProject = `Update theme
    SET title = ?, category = ?, content = ?, project_name = ?, updated_at = ?
    WHERE id = ?
    AND user_id = ?`;
    const [updatedStatus] = await connection.query(sqlUpdateProject, [
      themeData.title,
      themeData.category,
      themeData.content,
      themeData.project_name,
      updatedAt,
      themeId,
      userId
    ]);
    connection.release();
    if (updatedStatus.affectedRows !== 1) {
      return res.status(404).send();
    }

    return res.status(204).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }

    console.error(e);
    return res.status(500).send({
      message: e.message
    });
  }
}

module.exports = updateTheme;
