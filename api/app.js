require('dotenv').config();
require('./config/db');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require("cookie-session");
const cors = require('cors');

const usersRouter = require('./routes/users');
const authenRouter = require('./routes/authen');
const configRouter = require('./routes/config');
const meRouter = require('./routes/me');
const history1Router = require('./routes/history');
const settingRouter = require('./routes/settings');
const cskhRouter = require('./routes/cskh');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    cookieSession({
        name: "bezkoder-session",
        keys: ["COOKIE_SECRET"],
        httpOnly: true
    })
);
app.use(cors());
app.use('/users', usersRouter);
app.use('/me', meRouter);
app.use('/auth', authenRouter);
app.use('/config', configRouter);
app.use('/history', history1Router);
app.use('/setting', settingRouter);
app.use('/cskh', cskhRouter);

module.exports = app;
