'use strict';

const express = require('express');
const consign = require('consign');
const cors = require('cors');
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

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(expressValidator());

consign({ cwd: 'app' })
    .include('api')
    .then('db')
    .then('helpers')
    .then('routes')
    .then('routes/auth.js')
    .then('services')
    .into(app);

module.exports = app;