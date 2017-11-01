'use strict'

const NodeStore = require('../store/node')

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
   * @param {HyperdocSession} session - Hyperdoc session
   * @param {string} uuid - Node UUID
   * @return {Promise<Node>}
   */
  find (session, uuid) {
    return this.nodeStore.get(uuid)
  }

  /**
   * Save a node.
   *
   * @param {HyperdocSession} session - Hyperdoc session
   * @param {Node} node - Node
   */
  save (session, uuid, data, meta) {
    // set timestamps
    if (!meta.createTime) {
      meta.createTime = new Date().toISOString()
    }
    meta.updateTime = new Date().toISOString()

    return this.nodeStore.save(node)
  }
}

module.exports = NodeService
