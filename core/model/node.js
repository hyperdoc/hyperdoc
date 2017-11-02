'use strict'

/**
 * Represents a node in Hyperdoc.
 */
class Node {
  /**
   * Constructor.
   *
   * @param {string} uuid - Node UUID
   * @param {Object} data - Node data
   * @param {Object} meta - Node metadata
   */
  constructor (uuid, data, meta) {
    this.uuid = uuid
    this.data = data || {}
    this.meta = meta || {}
  }

  /**
   * Convert to JSON.
   */
  toJSON () {
    return {
      uuid: this.uuid,
      data: this.data,
      meta: this.meta
    }
  }

  /**
   * Build a Node instance from a JSON object.
   *
   * @param {Object} json - JSON
   */
  static fromJSON (json) {
    return new Node(json.uuid, json.data, json.meta)
  }
}

module.exports = Node
