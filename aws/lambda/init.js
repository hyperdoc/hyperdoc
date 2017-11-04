'use strict'

// read config
const config = require('../config')

// initiate store registry
const storeRegistry = require('../store')(config.aws)

// initiate Hyperdoc
const Hyperdoc = require('hyperdoc-core')
Hyperdoc.Repository.configure(config, storeRegistry)

module.exports = Hyperdoc
