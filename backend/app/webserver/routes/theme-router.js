'use strict';

const express = require('express');
const checkAccountSession = require('../controllers/account/check-account-session');

const createTheme = require('../controllers/theme/create-theme-controller');
const getTheme = require('../controllers/theme/get-theme-controller');
const getThemes = require('../controllers/theme/get-themes-controller');
const getThemesFilter = require('../controllers/theme/get-themes-category-controller');
const updateThemes = require('../controllers/theme/update-theme-controller');
const deletethemes = require('../controllers/theme/delete-theme-controller');

const router = express.Router();

router.post('/theme', checkAccountSession, createTheme);
router.get('/theme/:themeId', checkAccountSession, getTheme);
router.get('/theme', checkAccountSession, getThemes);
router.get('/theme/filter/:category', checkAccountSession, getThemesFilter);
router.put('/theme/:themeId', checkAccountSession, updateThemes);
router.delete('/theme/:themeId', checkAccountSession, deletethemes);

module.exports = router;
