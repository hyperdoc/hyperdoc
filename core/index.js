'use strict'

let H

/**
 * This class holds the execution context of Hyperdoc.
 */
class Hyperdoc {
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
function initHyperdoc (config, storeRegistry) {
  if (!H) {
    H = new Hyperdoc(config, storeRegistry)
  }

  return H
}

module.exports = initHyperdoc
