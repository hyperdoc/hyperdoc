'use strict'

/**
 * This class holds the execution context of Hyperdoc.
 */
class HyperdocContext {
  /**
   * Constructor.
   * 
   * @param {Object} config - Hyperdoc configuration
   * @param {StoreRegistry} storeRegistry - Store registry
   */
  constructor (config, storeRegistry) {
    this.config = config
    this.storeRegistry = storeRegistry

    // initialise repository
    this.Repository = require('./repository')(this)
  }
}

/**
 * This function initialises Hyperdoc given a configuration and a provider
 * specific stores registry.
 * 
 * @param {Object} config - Hyperdoc configuration
 * @param {StoreRegistry} storeRegistry - Store registry
 */
function initContext (config, storeRegistry) {
  return new HyperdocContext(config, storeRegistry)
}

module.exports = initContext
