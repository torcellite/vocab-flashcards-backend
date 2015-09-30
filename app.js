'use strict';

var express = require('express'),
    app = express(),
    compression = require('compression'),
    chalk = require('chalk'),
    config = require('./config/config');

var enableCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.frontend);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Length, Content-Type, X-Requested-With');
    res.header('Access-Control-Allow-Resource', '*');
 
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
};

var env = process.env.NODE_ENV || 'Development';
console.log(chalk.cyan('Environment:') + ' ' + env);

// Use compression
app.use(compression());

// Set up router
app.use(enableCORS);
app.use('/', require('./controllers/routes'));

app.listen(config.backend_port, function() {
    console.log(chalk.green('Listening:') + ' ' + config.backend_port);
});

// Expose app for testing
exports = module.exports = app;