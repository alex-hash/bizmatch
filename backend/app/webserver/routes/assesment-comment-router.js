'use strict';

const express = require('express');
const checkAccountSession = require('../controllers/account/check-account-session');

const createAssesmentComment = require('../controllers/comment-assesment/create-assesment-comment-controller');
const getAssesmentComment = require('../controllers/comment-assesment/get-assesment-comment-controller');
const getAssesmentCommentAvg = require('../controllers/comment-assesment/get-assesment-avg-comment-controller');

const router = express.Router();

router.post('/comment/assesment/:commentId', checkAccountSession, createAssesmentComment);
router.get('/comment/assesment/:projectId', checkAccountSession, getAssesmentComment);
router.get('/comment/assesmentavg/:projectId', getAssesmentCommentAvg);

module.exports = router;
