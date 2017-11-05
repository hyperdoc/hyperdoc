'use strict'

/**
 * Represents a node in Hyperdoc.
 */
export class NodeType {
  public uuid: string
  public data: any
  public meta: any

  /**
   * Constructor.
   *
   * @param {string} uuid - Node UUID
   * @param {any} data - Node data
   * @param {any} meta - Node metadata
   */
  constructor (uuid: string, data: any, meta: any) {
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
    return new NodeType(json.uuid, json.data, json.meta)
  }
}