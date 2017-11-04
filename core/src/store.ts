'use strict'

import { Node } from './model'

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
export class NodeStore {
  /**
   * Delete a node from the store.
   *
   * @param {string} uuid - Node UUID
   * @return {Promise} A promise that returns empty
   */
  delete (uuid: string): Promise<Node> {
    throw new Error("Node store must be an instance of 'NodeStore'")
  }

  /**
   * Read a node from the store.
   *
   * @param {string} uuid - Node UUID
   * @return {Promise<Node>} A promise that returns the node or an error
   */
  get (uuid: string): Promise<Node> {
    throw new Error("Node store must be an instance of 'NodeStore'")
  }

  /**
   * Put (create or update) a node in the store.
   *
   * @param {Node} node - Node
   * @return {Promise<Node>} A promise that returns the saved node or an error
   */
  put (node: Node): Promise<Node> {
    throw new Error("Node store must be an instance of 'NodeStore'")
  }
}