"use strict";

const express = require("express");
const checkAccountSession = require("../controllers/account/check-account-session");
const createAccount = require("../controllers/account/create-account-controller");
const getAccount = require("../controllers/account/get-account-controller");
const getAnotherAccount = require("../controllers/account/get-another-account-controller");
const updateAccount = require("../controllers/account/update-account-controller");
const deleteAccount = require("../controllers/account/delete-account-controller");
const getTopProjects = require("../controllers/account/get-top-projects-controller");
const getTopComments = require("../controllers/account/get-top-comments-controller");
const getAvg = require("../controllers/account/get-avg-user-controller");

const router = express.Router();

router.post("/account", createAccount);
router.get("/account", checkAccountSession, getAccount);
router.get("/account/:userId", checkAccountSession, getAnotherAccount);
router.put("/account", checkAccountSession, updateAccount);
router.get("/avgaccount", checkAccountSession, getAvg);
router.get("/avgaccount/:userId", checkAccountSession, getAvg)
router.delete("/account", checkAccountSession, deleteAccount);
router.get("/accountprojects", checkAccountSession, getTopProjects);
router.get("/accountcomments", checkAccountSession, getTopComments);
router.get("/accountprojects/:userId", checkAccountSession, getTopProjects);
router.get("/accountcomments/:userId", checkAccountSession, getTopComments);
router.get("/accountprojects/:userId", checkAccountSession, getTopProjects);

module.exports = router;
