'use strict';

const accountRouter = require('./account-router');
const authRouter = require('./auth-router');
const messageRouter = require('/message-router');
const projectRouter = require('./project-router');
const userRouter = require('./user-router');
const assesmentRouter = require('./assesment-router');
const commentRouter = require('./comment-router');
const bizmatchRouter = require('./bizmatch-router');

module.exports = {
  accountRouter,
  authRouter,
  messageRouter,
  projectRouter,
  userRouter,
  assesmentRouter,
  commentRouter,
  bizmatchRouter
};
