'use strict'

let NodeStore = require('../store/node')

/**
 * Node service.
 */
class NodeService {
  /**
   * Constructor.
   * 
   * @param {HyperdocContext} context - Hyperdoc context
   */
  constructor (context) {
    this.nodeStore = context.storeRegistry.getNodeStore()

    // validate
    if (!(this.nodeStore instanceof NodeStore)) {
      throw new Error("Node store must be an instance of 'NodeStore'")
    }
  }

  /**
   * Find a node by UUID.
   * 
   * @param {string} uuid 
   * @return {Promise<Node>}
   */
  find (uuid) {
    return this.nodeStore.get(uuid)
  }
}

module.exports = NodeService
