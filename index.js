'use strict';

require('dotenv').config();
const mysqlPool = require('./app/database/mysql-pool');
const webServer = require('./app/webserver');

const port = 8000;

async function initApp(){
    try{
        await mysqlPool.connect();
        await webServer.listen(port);
        console.log(`Server listening on port ${port}`);
    }catch(e){
        console.error(e);
        process.exit(1);
    }
}

initApp();