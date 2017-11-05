'use strict'

import { NodeStore } from '../store'
import { NodeType } from '../model'

/**
 * Node service.
 */
export class NodeService {
  private nodeStore: NodeStore

  /**
   * Constructor.
   *
   * @param {NodeStore} nodeStore - Node storage
   */
  constructor (nodeStore: NodeStore) {
    this.nodeStore = nodeStore
  }

  /**
   * Find a node by UUID.
   *
   * @param {HyperdocSession} session - Hyperdoc session
   * @param {string} uuid - Node UUID
   * @return {Promise<NodeType>}
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

    return this.nodeStore.put(new NodeType(undefined, data, meta))
  }
}
