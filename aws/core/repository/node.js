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

  /**
   * Save a node.
   * 
   * @param {Node} node - Node
   */
  save (node) {
    // set timestamps
    if (!node.meta.createTime) {
      node.meta.createTime = new Date().toISOString()
    }
    node.meta.updateTime = new Date().toISOString()

    return this.nodeStore.save(node)
  }
}

module.exports = NodeService
