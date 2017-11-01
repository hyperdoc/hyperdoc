'use strict'

// read config
const config = require('../config')

// initiate store registry
const storeRegistry = require('../store')(config.aws)

// initiate Hyperdoc
const H = require('../../core')(config.hyperdoc, storeRegistry)

module.exports = H
