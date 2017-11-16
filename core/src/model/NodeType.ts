'use strict'

import NodeHRN from './NodeHRN'
import HyperdocResource from './HyperdocResource'

/**
 * NodeType JSON structure.
 */
export type NodeTypeJSON = {
  uuid: string
  hrn: string
  data: {}
  meta: {}
}

/**
 * Represents a node in Hyperdoc.
 */
export default class NodeType implements HyperdocResource<NodeHRN> {
  readonly hrn: NodeHRN
  readonly uuid: string
  readonly data: {}
  readonly meta: {}

  /**
   * Constructor.
   *
   * @param {string} uuid - Node UUID
   * @param {{}} data - Node data
   * @param {{}} meta - Node metadata
   */
  constructor (uuid: string, data: {}, meta: {}) {
    this.uuid = uuid
    this.hrn = uuid ? new NodeHRN(uuid) : undefined
    this.data = data || {}
    this.meta = meta || {}
  }

  /**
   * Convert to JSON.
   * 
   * @returns {NodeTypeJSON} Node as JSON
   */
  toJSON (): NodeTypeJSON {
    return {
      uuid: this.uuid || null,
      hrn: this.hrn ? this.hrn.toString() : null,
      data: this.data,
      meta: this.meta
    }
  }

  /**
   * Build a Node instance from a JSON object.
   *
   * @param {NodeTypeJSON} json - JSON
   */
  static fromJSON (json: NodeTypeJSON): NodeType {
    return new NodeType(json.uuid, json.data, json.meta)
  }
}