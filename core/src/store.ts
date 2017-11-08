'use strict'

import { NodeType } from './model'

/**
 * Store registry.
 *
 * This registry is required to initialise Hyperdoc. In order to keep it as much independent from
 * the infrastructure provider as possible, each provider must implement its own stores and pass
 * the store registry along when initialising Hyperdoc.
 */
export class StoreRegistry {
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

/**
 * Storage for nodes.
 */
export interface NodeStore {
  /**
   * Delete a node from the store.
   *
   * @param {string} uuid - Node UUID
   * @return {Promise} A promise that returns empty
   */
  delete (uuid: string): Promise<NodeType>

  /**
   * Read a node from the store.
   *
   * @param {string} uuid - Node UUID
   * @return {Promise<NodeType>} A promise that returns the node or an error
   */
  get (uuid: string): Promise<NodeType>

  /**
   * Put (create or update) a node in the store.
   *
   * @param {NodeType} node - Node object
   * @return {Promise<NodeType>} A promise that returns the saved node or an error
   */
  put (node: NodeType): Promise<NodeType>
}