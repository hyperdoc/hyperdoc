'user strict'

const Hyperdoc = require('hyperdoc-core')
const StoreRegistry = Hyperdoc.Store.Registry

const AWSNodeStore = require('./node')

/**
 * Initialise an AWS based store registry.
 *
 * @param {Object} config - Configuration
 */
function initStoreRegistry (config) {
  // init stores
  const nodeStore = new AWSNodeStore(config)

  return new StoreRegistry({nodeStore})
}

module.exports = initStoreRegistry
