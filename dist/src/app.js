"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../ormconfig/ormconfig");
require("reflect-metadata");
const redis_service_1 = require("./services/redis.service");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config_1 = require("./constants/config");
if (config_1.ENV !== 'test') {
    const redisService = new redis_service_1.RedisService();
    redisService.connect();
}
const employeesRouter = require('./routes/employee');
const authRouter = require('./routes/auth');
ormconfig_1.connectionSource.initialize();
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/employees', employeesRouter);
app.use('/auth', authRouter);
module.exports = app;
//# sourceMappingURL=app.js.map