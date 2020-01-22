"use strict";
const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");

async function validate(payload) {
  const schema = Joi.object({
    projectId: Joi.string()
      .guid({
        version: ["uuidv4"]
      })
      .required(),
    userId: Joi.string()
      .guid({
        version: ["uuidv4"]
      })
      .required()
  });

  Joi.assert(payload, schema);
}

async function getProject(req, res, next) {
  const { projectId } = req.params;
  const { userId } = req.claims;

  const payload = {
    projectId,
    userId
  };

  try {
    await validate(payload);
  } catch (e) {
    return res.status(400).send(e);
  }

  let connection;
  try {
    const sqlQuery = `SELECT *
      FROM project
      WHERE id = ?`;

    connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [projectId]);
    connection.release();

    if(rows.length !== 1){
      return res.status(404).send();
    }

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

module.exports = getProject;
