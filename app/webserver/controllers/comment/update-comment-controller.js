'use strict';

const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');

async function validate(data) {
  const schema = Joi.object({
    id: Joi.string()
      .guid({
        version: ['uuidv4']
      })
      .required(),
    text: Joi.string().required(),
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

async function updateComment(req, res, next) {
  const commentData = { ...req.body };
  const { userId } = req.claims;
  const { projectId } = req.params;

  try {
    const data = {
      ...commentData,
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
    const sqlUpdateComment = `Update comment
    SET text = ?, updated_at = ?
    WHERE id = ?`;
    const [updatedStatus] = await connection.query(sqlUpdateComment, [commentData.text, updatedAt, commentData.id]);
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

module.exports = updateComment;
