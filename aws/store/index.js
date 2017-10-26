'user strict'

let StoreRegistry = require('../core/store/registry')
let AWSNodeStore = require('./node')

/**
 * Initialise an AWS based store registry.
 * 
 * @param {Object} config - Configuration
 */
function initStoreRegistry (config) {
  // init stores
  let nodeStore = new AWSNodeStore(config)

  return new StoreRegistry(nodeStore)
}

module.exports = initStoreRegistry
