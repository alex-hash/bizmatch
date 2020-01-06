'use strict';

const accountRouter = require('./account-router');
const login = require('./auth-router');

module.exports = {
    accountRouter,
    login,
};