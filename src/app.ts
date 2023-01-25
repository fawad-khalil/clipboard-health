import { connectionSource } from '../ormconfig/ormconfig';
import 'reflect-metadata';
import { RedisService } from './services/redis.service';
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
import { ENV } from './constants/config';

if (ENV !== 'test') {
  const redisService = new RedisService();
  redisService.connect();
}

const employeesRouter = require('./routes/employee');
const authRouter = require('./routes/auth');

connectionSource.initialize();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/employees', employeesRouter);
app.use('/auth', authRouter);

module.exports = app;
