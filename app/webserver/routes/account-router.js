'use strict';

const express = require('express');
const createAccount = require('../controllers/account/create-account-controller');
const getAccount = require('../controllers/account/get-account-controller');
const checkAccountSession = require('../controllers/account/check-account-session');

const router = express.Router();

router.post('/accounts', createAccount);
router.get('/accounts', checkAccountSession, getAccount);

module.exports = router;
