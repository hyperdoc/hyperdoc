'use strict'

import { NodeType } from '../model'

/**
 * Storage for nodes.
 */
export default interface NodeStore {
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