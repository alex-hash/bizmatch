"use strict";

const express = require("express");
const multer = require("multer");
const checkAccountSession = require("../controllers/account/check-account-session");
const uploadAvatar = require("../controllers/user/upload-avatar-controller");
const upload = multer();
const router = express.Router();

router.post(
  "/user/avatar",
  checkAccountSession,
  upload.single("avatar"),
  uploadAvatar
);

module.exports = router;
