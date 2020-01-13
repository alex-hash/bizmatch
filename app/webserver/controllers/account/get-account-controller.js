'use strict';

const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");

async function getUser(req, res, next){
    const { userId } = req.claims;

    let connection;
    try{
        connection = await mysqlPool.getConnection();
        const sqlQuery = `SELECT email, name, first_name, last_name, country, city, avatar_url, company_name, company_role, page_url, type
        FROM user WHERE id = ?`;
        const [ rows ] = await connection.execute(sqlQuery, [userId]);
        connection.release();

        if(rows.length !== 1){
            return res.status(404).send();
        }

        const [userData, ] = rows;

        return res.send({
            data: userData,
        });
        
    } catch(e) {
        if(connection){
            connection.release();
        }

        console.error(e);
        return res.status(500).send();
    }

}

module.exports = getUser;