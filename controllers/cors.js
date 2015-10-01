'use strict';

var config = require('../config/config');

module.exports = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.frontend);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Length, Content-Type, X-Requested-With');
    res.header('Access-Control-Allow-Resource', '*');
    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};