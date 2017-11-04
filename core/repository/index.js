'use strict'

const NodeService = require('./service/node')
const StoreRegistry = require('../store/registry')

const DEFAULT_CONFIG = {}

/**
 * Hyperdoc repository.
 */
class Repository {
  configure (config, storeRegistry) {
    this.config = config || DEFAULT_CONFIG
    this.storeRegistry = storeRegistry || new StoreRegistry()

    this.Node = new NodeService(this.storeRegistry.nodeStore)
  }
}

module.exports = new Repository()
