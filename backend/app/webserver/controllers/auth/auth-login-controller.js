'use strict';

const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const mysqlPool = require('../../../database/mysql-pool');

async function validate(data) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9@#$*]{3,30}$'))
      .required()
  });

  Joi.assert(data, schema);
}

async function login(req, res, next) {
  const accountData = { ...req.body };
  try {
    await validate(accountData);
  } catch (e) {
    return res.status(400).send(e);
  }

  const sqlQuery = `SELECT id, email, password, avatar_url, type
    FROM user
    WHERE email = ?`;

  try {
    const connection = await mysqlPool.getConnection();
    const [rows] = await connection.execute(sqlQuery, [accountData.email]);
    connection.release();

    if (rows.length !== 1) {
      res.status(401).send();
    }

    const user = rows[0];

    try {
      const passwordOk = await bcrypt.compare(accountData.password, user.password);
      if (!passwordOk) {
        return res.status(401).send();
      }
    } catch (e) {
      return res.status(500).send();
    }
    
    const payloadJwt = {
      avatar_url: user.avatar_url,
      userId: user.id,
      email: user.email,
      role: user.type
    };

    const jwtExpiresIn = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL);
    const token = jwt.sign(payloadJwt, process.env.AUTH_JWT_SECRET, {
      expiresIn: jwtExpiresIn
    });

    return res.send({
      accessToken: token,
      avatarUrl: user.avatar_url,
      expiresIn: jwtExpiresIn
    });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

module.exports = login;
