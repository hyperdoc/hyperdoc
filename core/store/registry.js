'use strict'

// default stores
const NodeStore = require('./node')

/**
 * Store registry.
 *
 * This registry is required to initialise Hyperdoc. In order to keep it as much independent from
 * the infrastructure provider as possible, each provider must implement its own stores and pass
 * the store registry along when initialising Hyperdoc.
 */
class StoreRegistry {
  /**
   * Constructor.
   *
   * @param {NodeStore} nodeStore - Node store
   */
  constructor ({nodeStore}) {
    // set a custom node store or a default one
    this.nodeStore = nodeStore || new NodeStore()
  }
}

module.exports = StoreRegistry
