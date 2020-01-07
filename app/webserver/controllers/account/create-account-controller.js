'use strict';

const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');
const sendgridMail = require('@sendgrid/mail');
const uuidV4 = require('uuid/v4');

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendWelcomeEmail(email) {
  const [username, ] = email.split('@');
  const msg = {
    to: email,
    from: 'bizmatchapp@yopmail.com',
    subject: 'Welcome to bizmatch :)',
    text: `Welcome ${username} to bizmatchapp, enjoy creating your projects!`,
    html: `<strong>Welcome ${username} to bizmatchapp, enjoy creating your projects!</strong>`,
  };

  const data = await sendgridMail.send(msg);
  console.log(data);

  return data;
}


async function validateAccount(data){
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        name: Joi.string().max(45).required(),
        first_name: Joi.string().max(45).required(),
        last_name: Joi.string().max(45).required(),
        birthday: Joi.required(), //Echarle un vistazo, buscar una manera en el frontend de parsear el dato de la manera correcta para introducirla a la BD
        country: Joi.string().max(20).required(),
        city: Joi.string().max(30).required(),
        company_name: Joi.string().max(255),
        company_role: Joi.string().max(255),
        page_url: Joi.string().max(512),
        type: Joi.string().max(1),
    });

    Joi.assert(data, schema);
}

async function createAccount(req, res, next){
    const accountData = { ...req.body };

    
    try {
        await validateAccount(accountData);
    } catch (e) {
        console.error(e);
        return res.status(400).send(e);
    }
    

    const now = new Date();
    const createdAtNow = now.toISOString().replace('T', ' ').substring(0, 19);
    const userId = uuidV4();
    const cryptpassword = await bcrypt.hash(accountData.password, 10);

    let connection;
    try{
        connection = await mysqlPool.getConnection();
        await connection.query('INSERT INTO user SET ?', {
            id: userId,
            email: accountData.email,
            password: cryptpassword,
            name: accountData.name,
            first_name: accountData.first_name,
            last_name: accountData.last_name,
            birthday: accountData.birthday,
            country: accountData.country,
            city: accountData.city,
            company_name: accountData.company_name,
            company_role: accountData.company_role,
            page_url: accountData.page_url,
            type: accountData.type,
            created_at: createdAtNow,

        });
        connection.release();
        res.status(201).send();

        try{
            await sendWelcomeEmail(accountData.email);
        } catch(e) {
            console.error(e);
        }

    } catch(e) {
        if(connection){
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