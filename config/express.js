'use strict';

const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const logger = require('./../app/services/logger.js');

const app = express();

app.set('ENV', process.env.ENV);
app.set('port', (process.env.PORT || 8080));
app.use(morgan("common", {
    stream: {
        write: function(mensagem) {
            logger.info(mensagem);
        }
    }
}));

app.set('keySecret', 'n0d3J$');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(expressValidator());

consign({ cwd: 'app' })
    .include('api')
    .then('db')
    .then('routes')
    .then('routes/auth.js')
    .then('services')
    .into(app);

module.exports = app;