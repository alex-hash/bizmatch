'use strict';

const Joi = require('@hapi/joi');
const uuidV4 = require('uuid/v4');

async function validateBizmatch(data){
    const schema = Joi.object({
        user_id: Joi.string().guid({
            version: ['uuidv4'],
          }).required(),
        project_id: Joi.string().guid({
            version: ['uuidv4'],
          }).required(), 
    });

    Joi.assert(data, schema);
}

async function createBizmatch(req, res, next){
    const { user_id } = req.claims;
    const data = { 
        ...req.body,
        user_id
    };
    const bizmatchid = uuidV4();
    
    try{
        await validateBizmatch(data);
    } catch (e) {
        console.error(e);
        res.status(400).send(e);
    }

    let connection;
    try{
        connection = await mysqlPool.getConnection();
        await connection.query('INSERT INTO bizmatch SET ?', {
            id: bizmatchid,
            user_id: user_id,
            project_id: data.project_id,
        });
        connection.release();
        res.status(201).send();
    }catch(e){
        if(connection){
            connection.release();
        }
        console.error(e);
        res.status(500).send(e);
    }
}

module.exports = createBizmatch;