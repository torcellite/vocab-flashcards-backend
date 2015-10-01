'use strict';

var express = require('express'),
    app = express(),
    compression = require('compression'),
    chalk = require('chalk'),
    cors = require('./controllers/cors'),
    config = require('./config/config');


var env = process.env.NODE_ENV || 'Development';
console.log(chalk.cyan('Environment:') + ' ' + env);

// Use CORS
app.use(cors);
// Use compression
app.use(compression());

// Set up router
app.use('/', require('./controllers/routes'));

var port = process.env.PORT || config.backend_port;
app.listen(port, function() {
    console.log(chalk.green('Listening:') + ' ' + port);
});

// Expose app for testing
exports = module.exports = app;