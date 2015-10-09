'use strict';

var config = require('../config/config');

module.exports = function(req, res, next) {
    var idx = config.frontend.indexOf(req.headers.origin);
    var isPreFlight = false;
    if (idx > -1) {
        res.header('Access-Control-Allow-Origin', config.frontend[idx]);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Length, Content-Type, X-Requested-With');
        res.header('Access-Control-Allow-Resource', '*');
        // intercept OPTIONS method
        if ('OPTIONS' === req.method) {
            isPreFlight = true;
            res.sendStatus(200);
        }
    }
    if (!isPreFlight)
        next();

};