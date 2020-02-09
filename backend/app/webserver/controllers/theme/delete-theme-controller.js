'use strict';

const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

async function validate(data) {
  const schema = Joi.object({
    themeId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required()
  });

  Joi.assert(data, schema);
}

async function deleteTheme(req, res, next) {
  const { themeId } = req.params;

  try {
    await validate({ themeId });
  } catch (e) {
    return res.status(400).send(e);
  }

  let connection;
  try {
    connection = await mysqlPool.getConnection();
    const sqlQueryC = `DELETE FROM comment_theme WHERE theme_id = ?`;

    const [deletedStatusC] = await connection.execute(sqlQueryC, [themeId]);
    
    const sqlQuery = `DELETE FROM theme
      WHERE id = ?`;

    const [deletedStatus] = await connection.execute(sqlQuery, [themeId]);
    connection.release();

    if (deletedStatus.affectedRows == 0) {
      return res.status(404).send();
    }
    
    return res.status(204).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }

    return res.status(500).send(e.message);
  }
}

module.exports = deleteTheme;
