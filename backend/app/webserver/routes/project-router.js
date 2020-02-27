'use strict';

const express = require('express');
const checkAccountSession = require('../controllers/account/check-account-session');
const multer = require('multer');
const upload = multer();

const addPictureProject = require('../controllers/project/add-picture-project-controller');
const createProject = require('../controllers/project/create-project-controller');
const getProject = require('../controllers/project/get-project-controller');
const getProjects = require('../controllers/project/get-projects-controller');
const deleteProject = require('../controllers/project/delete-project-controller');
const updateProject = require('../controllers/project/update-project-controller');
const getProjectsFilter = require('../controllers/project/get-projects-category-controller');
const getProjectsInit = require('../controllers/project/get-projects-init-controller.js');

const router = express.Router();
router.post('/project/:projectId', checkAccountSession, upload.single('image_url'), addPictureProject);
router.post('/project', checkAccountSession, createProject);
router.get('/project/:projectId', getProject);
router.get('/project', checkAccountSession, getProjects);
router.get('/projects/:userId', checkAccountSession, getProjectsFilter);
router.get('/projectsInit', getProjectsInit);
router.delete('/project/:projectId', checkAccountSession, deleteProject);
router.put('/project/:projectId', checkAccountSession, updateProject);

module.exports = router;
