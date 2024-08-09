var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");

const configViewEngine = (app) => {

    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
          "Access-Control-Allow-Methods",
          "OPTIONS, GET, POST, PUT, PATCH, DELETE"
        );
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.setHeader("Access-Control-Expose-Headers", "Authorization");
        next();
      });    

    app.set('views', path.join(__dirname, '../api/views'));
    app.set('view engine', 'ejs');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(session({
      secret: 'abcdefg',
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 60000 }
    }));
}

module.exports = configViewEngine