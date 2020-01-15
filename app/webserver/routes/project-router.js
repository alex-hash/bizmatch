"use strict";

const express = require("express");
const checkAccountSession = require("../controllers/account/check-account-session");

const createProject = require("../controllers/project/create-project-controller");

const router = express.Router();

router.post("/project", checkAccountSession, createProject);

module.exports = router;
