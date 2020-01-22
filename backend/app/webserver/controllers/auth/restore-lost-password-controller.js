"use strict";

const base64 = require('js-base64').Base64;
const bcrypt = require('bcrypt');
const mysqlPool = require('../../../database/mysql-pool');

async function restoreLostPassword(req, res, next){
    const { objects } = req.params;
    const accountData = { ...req.body };
    const params = base64.decode(objects);
    const paramsSplit = params.split(":");
    const email = paramsSplit[1];
    const old_password = paramsSplit[2];
    console.log(paramsSplit);
    const new_password = await bcrypt.hash(accountData.password, 10);
    let connection;
    try{
        connection = await mysqlPool.getConnection();
        const updatedAt = new Date().toISOString().substring(0, 19).replace("T", " ");
        const sqlUpdateProject = `UPDATE user
        SET password = ?, updated_at = ?
        WHERE email = ? and password = ?`;
        const [updatedStatus] = await connection.query(sqlUpdateProject, [
            new_password,
            updatedAt,
            email,
            old_password
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

module.exports = restoreLostPassword;