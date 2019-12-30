'use strict';

const express = require('express');
const createAccount = require('../controllers/account/create-account-controller');

const router = express.Router();

router.post('/accounts', createAccount);

module.exports = router;
