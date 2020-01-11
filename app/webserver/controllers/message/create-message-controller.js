'use strict';

const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');
const uuidV4 = require('uuid/v4');

async function validateMessage(data){
    const schema = Joi.object({
        content: Joi.string().required(),
        destination_id: Joi.string().required(),
    });

    Joi.assert(data, schema);
}

async function createMessage(req, res, next){
    const messageData = { ...req.body };
    const { userId } = req.claims;

    try{
        await validateMessage(messageData);
    } catch (e) {
        console.error(e);
        res.status(400).send(e);
    }

    const now = new Date();
    const createdAtNow = now.toISOString().replace('T', ' ').substring(0, 19);
    const messageId = uuidV4();

    const arrayIdConversation = [userId, messageData.destination_id];
    const arrayIdConversationsorted = arrayIdConversation.sort();
    const conversation_id = arrayIdConversationsorted.join('');

    let connection;
    try{
        connection = await mysqlPool.getConnection();
        await connection.query('INSERT INTO message SET ?', {
            id: messageId,
            content: messageData.content,
            created_at: createdAtNow,
            origin_id: userId,
            destination_id: messageData.destination_id,
            conversation: conversation_id,
        });
        connection.release();
        res.status(201).send();
    } catch (e) {
        if(connection){
            connection.release();
        }
        console.error(e);
        res.status(500).send(e);
    }
}

module.exports = createMessage;