'use strict'

import { NodeStore } from '../store'
import { NodeType } from '../model'
import { Session } from '../repository'

/**
 * Node service.
 */
export default class NodeService {
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
   * @param {Session} session - Hyperdoc session
   * @param {string} uuid - Node UUID
   * @returns {Promise<NodeType>} A promise that returns the saved node or an error
   */
  find (session: Session, uuid: string): Promise<NodeType> {
    return this.nodeStore.get(uuid).then(node => {
      // TODO security checks
      return Promise.resolve(node)
    })
  }

  /**
   * Save a node.
   *
   * @param {Session} session - Hyperdoc session
   * @param {{}} data - Node data
   * @param {{}} meta - Node metadata
   * @returns {Promise<NodeType>} A promise that returns the saved node or an error
   */
  create (session: Session, data: {}, meta: {}): Promise<NodeType> {
    // set timestamps
    const customMeta = <any>meta
    customMeta.createTime = new Date().toISOString()
    customMeta.updateTime = customMeta.createTime

    // TODO security checks

    return this.nodeStore.put(new NodeType(undefined, data, customMeta))
  }
}
