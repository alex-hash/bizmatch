"use strict";

const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");
const uuidV4 = require("uuid/v4");

async function validateProject(data) {
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
    image_url: Joi.string().max(512),
    video_url: Joi.string().max(512),
    prize: Joi.number().required(),
    duration: Joi.number().required(),
    text: Joi.string()
      .max(65536)
      .required(),
    rewards: Joi.array().items(Joi.object({
        prize: Joi.number().required(),
        title: Joi.string().max(60).required(),
        month: Joi.string().max(20).required(),
        year: Joi.number().required(),
        subtitle: Joi.string().max(135).required(),
    }))
  });

  Joi.assert(data, schema);
}

async function insertReward(project_id, {prize, title, month, year, subtitle}){
  const reward_id = uuidV4();
  let connection;
  try {
    connection = await mysqlPool.getConnection();
    await connection.query("INSERT INTO reward SET ?", {
      id: reward_id,
      project_id: project_id,
      prize: prize,
      title: title,
      month: month,
      year: year,
      subtitle: subtitle,
    });
    connection.release();
  } catch (e) {
    if (connection) {
      connection.release();
    }
    console.error(e);
    res.status(500).send(e);
  }
}

async function createProject(req, res, next) {
  const projectData = { ...req.body };
  const { userId } = req.claims;
  try {
    const data = {
      ...projectData
    };
    await validateProject(data);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  const createdAt = new Date()
    .toISOString()
    .substring(0, 19)
    .replace("T", " ");
  const projectId = uuidV4();
  const rewards = projectData.rewards;

  let connection;
  try {
    connection = await mysqlPool.getConnection();
    await connection.query("INSERT INTO project SET ?", {
      id: projectId,
      title: projectData.title,
      subtitle: projectData.subtitle,
      category: projectData.category,
      ubication: projectData.ubication,
      image_url: projectData.image_url,
      video_url: projectData.video_url,
      prize: projectData.prize,
      duration: projectData.duration,
      text: projectData.text,
      created_at: createdAt,
      user_id: userId
    });
    connection.release();
    rewards.map((reward) => {
      insertReward(projectId, {...reward});
    });

    res.status(201).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }
    console.error(e);
    res.status(500).send(e);
  }
}

module.exports = createProject;
