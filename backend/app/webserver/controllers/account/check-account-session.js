'use strict';

const jwt = require('jsonwebtoken');

async function checkAccountSession(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send();
  }

  const [prefix, token] = authorization.split(' ');
  if (prefix !== 'Bearer' || !token) {
    return res.status(401).send();
  }

  try {
    const {
      userId,
      role,
    } = jwt.verify(token, process.env.AUTH_JWT_SECRET);

    req.claims = {
      userId,
      role,
    };

    next();
  } catch (e)  {
    console.error(e);
    return res.status(401).send();
  }
}

module.exports = checkAccountSession;
