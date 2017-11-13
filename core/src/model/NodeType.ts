'use strict'

import NodeHRN from './NodeHRN'
import HyperdocResource from './HyperdocResource'

/**
 * Represents a node in Hyperdoc.
 */
export default class NodeType implements HyperdocResource<NodeHRN> {
  public hrn: NodeHRN
  public data: any
  public meta: any

  /**
   * Constructor.
   *
   * @param {NodeHRN} hrn - Hyperdoc Resource Name
   * @param {any} data - Node data
   * @param {any} meta - Node metadata
   */
  constructor (hrn: NodeHRN, data: any, meta: any) {
    this.hrn = hrn
    this.data = data || {}
    this.meta = meta || {}
  }

  /**
   * Convert to JSON.
   */
  toJSON () {
    return {
      hrn: this.hrn ? this.hrn.toString() : null,
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
    const hrn = json.hrn ? NodeHRN.fromString(json.hrn) : undefined
    return new NodeType(hrn, json.data, json.meta)
  }
}