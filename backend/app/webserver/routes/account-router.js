"use strict";

const express = require("express");
const checkAccountSession = require("../controllers/account/check-account-session");
const createAccount = require("../controllers/account/create-account-controller");
const getAccount = require("../controllers/account/get-account-controller");
const getAnotherAccount = require("../controllers/account/get-another-account-controller");
const updateAccount = require("../controllers/account/update-account-controller");
const deleteAccount = require("../controllers/account/delete-account-controller");

const router = express.Router();

router.post("/account", createAccount);
router.get("/account", checkAccountSession, getAccount);
router.get("/account/:userId", checkAccountSession, getAnotherAccount);
router.put("/account", checkAccountSession, updateAccount);
router.delete("/account", checkAccountSession, deleteAccount);

module.exports = router;
