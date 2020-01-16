"use strict";

const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");

async function validateUpdate(payload) {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: false })
      .required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    newPassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    name: Joi.string()
      .max(45)
      .required(),
    first_name: Joi.string()
      .max(45)
      .required(),
    last_name: Joi.string()
      .max(45)
      .required(),
    birthday: Joi.required(), //Echarle un vistazo, buscar una manera en el frontend de parsear el dato de la manera correcta para introducirla a la BD
    country: Joi.string()
      .max(20)
      .required(),
    city: Joi.string()
      .max(30)
      .required(),
    company_name: Joi.string().max(255),
    company_role: Joi.string().max(255),
    page_url: Joi.string().max(512),
    type: Joi.string()
      .max(1)
      .required(),
    userId: Joi.string()
      .guid({
        version: ["uuidv4"]
      })
      .required()
  });

  Joi.assert(payload, schema);
}

async function updateUser(req, res, next) {
  const { userId } = req.claims;
  const userData = {
    ...req.body,
    userId
  };

  try {
    await validateUpdate(userData);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  let connection;
  let actualPassword;
  try {
    connection = await mysqlPool.getConnection();
    const mysqlQuery = `SELECT password FROM user WHERE id=?`;
    const [rows] = await connection.execute(mysqlQuery, [userId]);
    connection.release();

    if (rows.length !== 1) {
      return res.status(404).send();
    }

    actualPassword = rows[0].password;
  } catch (e) {
    if (connection) {
      connection.release();
    }

    console.error(e);
    return res.status(500).send();
  }

  try {
    connection = await mysqlPool.getConnection();
    const now = new Date()
      .toISOString()
      .replace("T", " ")
      .substring(0, 19);

    if (userData.newPassword !== undefined) {
      const isPasswordOk = await bcrypt.compare(
        userData.password,
        actualPassword
      );
      if (!isPasswordOk) {
        return res.status(401).send();
      }
      const queryUpdateUser = `UPDATE user
            SET email = ?, password = ?, name = ?, first_name = ?, last_name = ?, birthday = ?, country = ?, city = ?, company_name = ?, page_url = ?, type = ?, updated_at = ?
            WHERE id = ?`;

      const bcryptPassword = await bcrypt.hash(userData.password, 10);

      await connection.query(queryUpdateUser, [
        userData.email,
        bcryptPassword,
        userData.name,
        userData.first_name,
        userData.last_name,
        userData.birthday,
        userData.country,
        userData.city,
        userData.company_name,
        userData.page_url,
        userData.type,
        now,
        userId
      ]);
      connection.release();
      return res.status(204).send();
    } else {
      const queryUpdateUser = `UPDATE user
            SET email = ?, name = ?, first_name = ?, last_name = ?, birthday = ?, country = ?, city = ?, company_name = ?, page_url = ?, type = ?, updated_at = ?
            WHERE id = ?`;
      await connection.query(queryUpdateUser, [
        userData.email,
        userData.name,
        userData.first_name,
        userData.last_name,
        userData.birthday,
        userData.country,
        userData.city,
        userData.company_name,
        userData.page_url,
        userData.type,
        now,
        userId
      ]);
      connection.release();
      return res.status(204).send();
    }
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

module.exports = updateUser;
