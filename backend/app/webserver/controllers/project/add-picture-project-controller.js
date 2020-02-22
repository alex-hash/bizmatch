'use strict';

const Joi = require('@hapi/joi');
const cloudinary = require('cloudinary').v2;
const mysqlPool = require('../../../database/mysql-pool');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function validate(data) {
  const schema = Joi.object({
    projectId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required()
  });

  Joi.assert(data, schema);
}

async function addPictureProject(req, res, next) {
  const { projectId } = req.params;
  const data = { projectId };

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
        public_id: projectId,
        width: 2000,
        height: 2000,
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
          const sqlQuery = `UPDATE project
          SET image_url = ?
          WHERE id = ?`;
          connection = await mysqlPool.getConnection();
          connection.execute(sqlQuery, [secureUrl, projectId]);
          connection.release();

          res.header('Location', secureUrl);
          return res.status(201).send();
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

module.exports = addPictureProject;
