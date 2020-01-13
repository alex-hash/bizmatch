'use strict';

const express = require('express');
const createMessage =  require('../controllers/message/create-message-controller');
const checkAccountSession = require('../controllers/account/check-account-session');
const getMessageConversations = require('../controllers/message/get-message-conversations-controller');
const getConversation = require('../controllers/message/get-conversation');

const router = express.Router();

router.post('/message', checkAccountSession, createMessage);
router.get('/message', checkAccountSession, getMessageConversations);
router.get('/conversation', checkAccountSession, getConversation);

module.exports = router;