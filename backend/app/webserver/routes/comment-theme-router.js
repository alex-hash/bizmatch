'use strict';

const express = require('express');
const checkAccountSession = require('../controllers/account/check-account-session');

const createCommentTheme = require('../controllers/comment-theme/create-comment-theme-controller');
const getCommentTheme = require('../controllers/comment-theme/get-comment-theme-controller');
const updateCommentTheme = require('../controllers/comment-theme/update-comment-theme-controller');
const deleteCommentTheme = require('../controllers/comment-theme/delete-comment-theme-controller');

const router = express.Router();

router.post('/theme/comment/:themeId', checkAccountSession, createCommentTheme);
router.get('/theme/comment/:themeId', checkAccountSession, getCommentTheme);
router.put('/theme/comment/:themeId', checkAccountSession, updateCommentTheme);
router.put('/comment-theme/delete', checkAccountSession, deleteCommentTheme);

module.exports = router;
