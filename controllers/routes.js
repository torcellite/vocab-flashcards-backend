'use strict';

/**
 * API Routes
 */

var express = require('express'),
    router = express.Router(),
    cors = require('./cors'),
    utils = require('./utils'),
    config = require('../config/config');

router.options('/define/:word', cors);
router.get('/define/:word', cors, utils.getDefinition);
router.get('/define/:word', cors, utils.getDefinition);

module.exports = router;