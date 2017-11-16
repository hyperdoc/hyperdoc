'use strict'

import { NodeType } from '../model'
import NodeStore from './NodeStore'

/**
 * Store registry.
 *
 * This registry is required to initialise Hyperdoc. In order to keep it as much independent from
 * the infrastructure provider as possible, each provider must implement its own stores and pass
 * the store registry along when initialising Hyperdoc.
 */
export default class StoreRegistry {
  public nodeStore: NodeStore

  /**
   * Constructor.
   *
   * @param {NodeStore} nodeStore - Node store
   */
  constructor (nodeStore: NodeStore) {
    // set a custom node store or a default one
    this.nodeStore = nodeStore
  }
}