'use strict'

/**
 * Storage for nodes.
 */
class NodeStore {
  /**
   * Delete a node from the store.
   * 
   * @param {string} uuid - Node UUID
   * @return {Promise} A promise that returns empty
   */
  delete (uuid) {
    throw new Error("'delete' method not implemented. NodeStore must be extended for each provider.")
  }

  /**
   * Read a node from the store.
   * 
   * @param {string} uuid - Node UUID
   * @return {Promise<Node>} A promise that returns the node or an error
   */
  get (uuid) {
    throw new Error("'get' method not implemented. NodeStore must be extended for each provider.")
  }

  /**
   * Put (create or update) a node in the store.
   * 
   * @param {class} node - Node
   * @return {Promise<Node>} A promise that returns the saved node or an error
   */
  put (node) {
    throw new Error("'put' method not implemented. NodeStore must be extended for each provider.")
  }
}

module.exports = NodeStore
