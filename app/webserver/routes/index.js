"use strict";

const accountRouter = require("./account-router");
const authRouter = require("./auth-router");
const messageRouter = require("/message-router");
const projectRouter = require("./project-router");

module.exports = {
  accountRouter,
  authRouter,
  messageRouter,
  projectRouter
};
