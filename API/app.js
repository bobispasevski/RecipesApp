var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');
const cors= require("cors");

mongoose.connect(`mongodb+srv://BobiS:whoneedpass@cluster0.f4uhoos.mongodb.net/sheycars-proba`);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipes',recipesRouter);

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send("Please Login, sesion expired");
    }
  });

module.exports = app;
