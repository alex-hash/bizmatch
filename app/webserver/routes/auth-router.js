'use strict';

const express = require('express');
const login = require('../controllers/auth/auth-login-controller');
const lostPassword = require('../controllers/auth/lost-password-controller');
const restorePassword = require('../controllers/auth/restore-lost-password-controller');

const router = express.Router();

router.post('/login', login);
router.post('/lostPassword', lostPassword);
router.put('/lostPassword/:objects', restorePassword);

module.exports = router;