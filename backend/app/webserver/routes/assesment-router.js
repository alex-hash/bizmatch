'use strict';

const express = require('express');
const checkAccountSession = require('../controllers/account/check-account-session');

const createAssesment = require('../controllers/assesment/create-assesment-controller');
const getAssesment = require('../controllers/assesment/get-assesment-controller');
const getAssesmentAvg = require('../controllers/assesment/get-assesment-avg-controller');
const updateAssesment = require('../controllers/assesment/update-assesment-controller');

const router = express.Router();

router.post('/project/assesment/:projectId', checkAccountSession, createAssesment);
router.get('/project/assesment/:projectId', checkAccountSession, getAssesment);
router.put('/project/assesment/:projectId', checkAccountSession, updateAssesment);
router.get('/project/assesmentavg/:projectId', getAssesmentAvg)

module.exports = router;
