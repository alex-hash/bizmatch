'use strict';

const Joi = require('@hapi/joi');
const cloudinary = require('cloudinary').v2;
const mysqlPool = require('../../../database/mysql-pool');
const jwt = require('jsonwebtoken');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function validate(data) {
  const schema = Joi.object({
    userId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required()
  });

  Joi.assert(data, schema);
}

async function uploadAvatar(req, res, next) {
  const { userId } = req.claims;
  const data = { userId };

  try {
    await validate(data);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  const { file } = req;

  if (!file || !file.buffer) {
    return res.status(400).send({
      message: 'invalid image'
    });
  }

  cloudinary.uploader
    .upload_stream(
      {
        resource_type: 'image',
        public_id: userId,
        width: 200,
        height: 200,
        format: 'jpg',
        crop: 'limit'
      },
      async (err, result) => {
        if (err) {
          console.error(err);
          return res.status(400).send(err);
        }

        const { secure_url: secureUrl } = result;

        let connection;
        try {
          const sqlQuery = `UPDATE user
          SET avatar_url = ?
          WHERE id = ?`;
          const sqlQuery2 = `SELECT id, email, password, avatar_url, type
          FROM user
          WHERE id = ?`;
          connection = await mysqlPool.getConnection();
          connection.execute(sqlQuery, [secureUrl, userId]);
          connection.release();

          connection = await mysqlPool.getConnection();
          const [rows] = await connection.execute(sqlQuery2, [userId]);
          connection.release();

          if (rows.length !== 1) {
            res.status(401).send();
          }

          const user = rows[0];

          const payloadJwt = {
            avatar_url: secureUrl,
            userId: userId,
            email: user.email,
            role: user.type
          };

          const jwtExpiresIn = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL);
          const token = jwt.sign(payloadJwt, process.env.AUTH_JWT_SECRET, {
            expiresIn: jwtExpiresIn
          });

          res.header('Location', secureUrl);

          return res.send({
            accessToken: token,
            avatarUrl: secureUrl,
            expiresIn: jwtExpiresIn
          });
        } catch (e) {
          if (connection) {
            connection.release();
          }
          console.error(e);
          return res.status(500).send(e.message);
        }
      }
    )
    .end(file.buffer);
}

module.exports = uploadAvatar;
