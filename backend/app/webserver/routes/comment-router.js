'use strict';

const express = require('express');
const checkAccountSession = require('../controllers/account/check-account-session');

const createComment = require('../controllers/comment/create-comment-controller');
const getComment = require('../controllers/comment/get-comment-controller');
const updateComment = require('../controllers/comment/update-comment-controller');
const deleteComment = require('../controllers/comment/delete-comment-controller');

const router = express.Router();

router.post('/project/comment/:projectId', checkAccountSession, createComment);
router.get('/project/comment/:projectId', checkAccountSession, getComment);
router.put('/project/comment/:projectId', checkAccountSession, updateComment);
router.delete('/comment/delete/:commentId', checkAccountSession, deleteComment);

module.exports = router;
