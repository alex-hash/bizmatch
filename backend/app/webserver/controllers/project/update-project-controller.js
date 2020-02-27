'use strict';

const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

async function validate(data) {
  const schema = Joi.object({
    title: Joi.string()
      .trim()
      .min(1)
      .max(60)
      .required(),
    subtitle: Joi.string()
      .trim()
      .min(1)
      .max(135)
      .required(),
    category: Joi.string().required(),
    ubication: Joi.string()
      .max(60)
      .required(),
    image_url: Joi.object(),
    video_url: Joi.string().max(512),
    prize: Joi.number(),
    duration: Joi.number(),
    text: Joi.string()
      .max(65536)
      .required(),
    rewards: Joi.array().items(
      Joi.object({
        prize: Joi.number(),
        title: Joi.string().max(60),
        month: Joi.string().max(20),
        year: Joi.number(),
        subtitle: Joi.string().max(135)
      })
    ),
    userId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required(),
    projectId: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required()
  });

  Joi.assert(data, schema);
}

async function updateProject(req, res, next) {
  const projectData = { ...req.body };
  const { userId } = req.claims;
  const { projectId } = req.params;
  try {
    const data = {
      ...projectData,
      userId,
      projectId
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
    const sqlUpdateProject = `Update project
    SET title = ?, subtitle = ?, category = ?, ubication = ?, video_url = ?, prize = ?, duration = ?, text = ?, updated_at = ?
    WHERE id = ?
    AND user_id = ?`;
    const [updatedStatus] = await connection.query(sqlUpdateProject, [
      projectData.title,
      projectData.subtitle,
      projectData.category,
      projectData.ubication,
      projectData.video_url,
      projectData.prize,
      projectData.duration,
      projectData.text,
      updatedAt,
      projectId,
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

module.exports = updateProject;
