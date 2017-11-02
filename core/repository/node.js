'use strict'

const NodeStore = require('../store/node')
const Node = require('../model/node')

/**
 * Node service.
 */
class NodeService {
  /**
   * Constructor.
   *
   * @param {NodeStore} nodeStore - Node storage
   */
  constructor (nodeStore) {
    this.nodeStore = nodeStore

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
    return this.nodeStore.get(uuid).then(node => {
      // TODO security checks
      return Promise.resolve(node)
    })
  }

  /**
   * Save a node.
   *
   * @param {HyperdocSession} session - Hyperdoc session
   * @param {Object} data - Node data
   * @param {Object} meta - Node metadata
   */
  create (session, data, meta) {
    // set timestamps
    meta.createTime = new Date().toISOString()
    meta.updateTime = meta.createTime

    // TODO security checks

    return this.nodeStore.put(new Node(undefined, data, meta))
  }
}

module.exports = NodeService
