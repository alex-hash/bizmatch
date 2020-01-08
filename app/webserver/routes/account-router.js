'use strict';

const express = require('express');
const checkAccountSession = require('../controllers/account/check-account-session');
const createAccount = require('../controllers/account/create-account-controller');
const getAccount = require('../controllers/account/get-account-controller');
const updateAccount = require('../controllers/account/update-account-controller')

const router = express.Router();

router.post('/accounts', createAccount);
router.get('/accounts', checkAccountSession, getAccount);
router.put('/accounts', checkAccountSession, updateAccount);

module.exports = router;
