'use strict'

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
  constructor (nodeStore) {
    this.nodeStore = nodeStore
  }

  /**
   * Get node store.
   *
   * @return Node store
   */
  getNodeStore () {
    return this.nodeStore
  }
}

module.exports = StoreRegistry
