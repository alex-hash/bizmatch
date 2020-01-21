'use strict';

const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

async function validate(data){
    const schema = Joi.object({
      userId: Joi.string()
      .guid({
        version: ["uuidv4"]
      })
      .required()
    })

    Joi.assert(data, schema);
}

async function deleteAccount(req, res, next){
  const { userId } = req.claims;
  const accountData = { userId }

  try{
    await validate(accountData)
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  let connection;
  try{
    connection = await mysqlPool.getConnection();
    const sqlQuery = `DELETE FROM user
      WHERE id = ?`;

    const [deletedStatus] = await connection.execute(sqlQuery, [userId]);
    connection.release();
    if (deletedStatus.affectedRows !== 1) {
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

module.exports = deleteAccount;