'use strict';

/**
 * API Routes
 */

var express = require('express'),
    router = express.Router(),
    utils = require('./utils'),
    config = require('../config/config');

router.get('/define/:word', utils.getDefinition);

module.exports = router;