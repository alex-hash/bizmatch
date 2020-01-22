'use strict';

const express = require('express');

const accountRouter = require('./routes/account-router');
const authRouter = require('./routes/auth-router');
const messageRouter = require('./routes/message-router');
const projectRouter = require('./routes/project-router');
const userRouter = require('./routes/user-router');
const themeRouter = require('./routes/theme-router');
const assesmentRouter = require('./routes/assesment-router');
const commentRouter = require('./routes/comment-router');
const bizmatchRouter = require('./routes/bizmatch-router');

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', accountRouter);
app.use('/api', authRouter);
app.use('/api', messageRouter);
app.use('/api', projectRouter);
app.use('/api', userRouter);
app.use('/api', themeRouter);
app.use('/api', assesmentRouter);
app.use('/api', commentRouter);
app.use('/api', bizmatchRouter);

let server = null;
async function listen(port) {
  if (server) {
    return server;
  }

  try {
    server = await app.listen(port);
    return server;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function close() {
  if (server) {
    await server.close();
    server = null;
  } else {
    console.error('Can not close a non started server');
  }
}

module.exports = {
  listen,
  close
};
