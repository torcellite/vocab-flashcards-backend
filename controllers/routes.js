'use strict';

/**
 * API Routes
 */

var express = require('express'),
    router = express.Router(),
    cors = require('cors'),
    utils = require('./utils'),
    config = require('../config/config');
    // corsOptions = {
    //     origin: config.frontend_origin,
    //     methods: ['GET'],
    //     allowedHeaders: 'Content-Type' //,
    //         //preflightContinue: true
    // };

router.get('/define/:word', utils.getDefinition);

module.exports = router;