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
   * @return {Promise<NodeType>}
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
   * @param {any} data - Node data
   * @param {any} meta - Node metadata
   */
  create (session: Session, data: any, meta: any): Promise<NodeType> {
    // set timestamps
    meta.createTime = new Date().toISOString()
    meta.updateTime = meta.createTime

    // TODO security checks

    return this.nodeStore.put(new NodeType(undefined, data, meta))
  }
}
