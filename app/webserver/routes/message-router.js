'use strict';

const express = require('express');
const createMessage =  require('../controllers/message/create-message-controller');
const checkAccountSession = require('../controllers/account/check-account-session');

const router = express.Router();

router.post('/message', checkAccountSession, createMessage);

module.exports = router;