'use strict';

const express = require('express');
const checkAccountSession = require('../controllers/account/check-account-session');

const createBizmatch = require('../controllers/bizmatch/new-bizmatch-controller');
const deleteBizmatch = require('../controllers/bizmatch/delete-bizmatch-controller');

const router = express.Router();

router.post('/bizmatch', checkAccountSession, createBizmatch);
router.delete('/bizmatch', checkAccountSession, deleteBizmatch);

module.exports = router;
