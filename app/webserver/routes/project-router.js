"use strict";

const express = require("express");
const checkAccountSession = require("../controllers/account/check-account-session");

const createProject = require("../controllers/project/create-project-controller");
const getProject = require("../controllers/project/get-project-controller");

const router = express.Router();

router.post("/project", checkAccountSession, createProject);
router.get("/project", checkAccountSession, getProject);
module.exports = router;
