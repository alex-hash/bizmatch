'use strict';

const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');
const sendgridMail = require('@sendgrid/mail');
const uuidV4 = require('uuid/v4');

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendWelcomeEmail(email) {
  const [username] = email.split('@');
  const msg = {
    to: email,
    from: 'bizmatchapp@yopmail.com',
    subject: 'Welcome to bizmatch :)',
    text: `Welcome ${username} to bizmatchapp, enjoy creating your projects!`,
    html: `<strong>Welcome ${username} to bizmatchapp, enjoy creating your projects!</strong>`
  };

  const data = await sendgridMail.send(msg);
  console.log(data);

  return data;
}

async function validate(data) {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: false })
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9@#$*]{3,30}$'))
      .required(),
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
    company_name: Joi.string()
      .max(255)
      .allow(''),
    company_role: Joi.string()
      .max(255)
      .allow(''),
    page_url: Joi.string()
      .max(512)
      .allow(''),
    type: Joi.string().max(1)
  });

  Joi.assert(data, schema);
}

async function createAccount(req, res, next) {
  const accountData = { ...req.body };

  try {
    await validate(accountData);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  const now = new Date();
  const createdAtNow = now
    .toISOString()
    .replace('T', ' ')
    .substring(0, 19);
  const userId = uuidV4();
  const cryptpassword = await bcrypt.hash(accountData.password, 10);
  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  let connection;
  try {
    connection = await mysqlPool.getConnection();
    await connection.query('INSERT INTO user SET ?', {
      id: userId,
      email: accountData.email,
      password: cryptpassword,
      name: capitalize(accountData.name),
      first_name: capitalize(accountData.first_name),
      last_name: capitalize(accountData.last_name),
      birthday: accountData.birthday,
      company_name: capitalize(accountData.company_name),
      company_role: capitalize(accountData.company_role),
      avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
      page_url: accountData.page_url,
      type: accountData.type,
      created_at: createdAtNow
    });
    connection.release();
    res.status(201).send();

    try {
      await sendWelcomeEmail(accountData.email);
    } catch (e) {
      console.error(e);
    }
  } catch (e) {
    if (connection) {
      connection.release();
    }
    console.error(e);
    if (e.code === 'ER_DUP_ENTRY') {
      return res.status(409).send();
    }

    return res.status(500).send();
  }
}

module.exports = createAccount;
