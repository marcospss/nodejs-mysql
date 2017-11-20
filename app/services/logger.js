'use strict';

const winston = require('winston');
const fs = require('fs');

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

module.exports = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: "info",
            filename: "logs/api.log",
            maxsize: 1000,
            maxFiles: 5
        })
    ]
});