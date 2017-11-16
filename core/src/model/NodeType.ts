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
 * NodeType are immutable and must be created through this builder.
 */
export class NodeTypeBuilder {
  private json: NodeTypeJSON

  constructor(node?: NodeType) {
    this.json = node ? node.toJSON() : <NodeTypeJSON>{}
  }

  uuid(uuid: string): NodeTypeBuilder {
    this.json.uuid = uuid
    return this
  }

  data(data: {}): NodeTypeBuilder {
    this.json.data = data
    return this
  }

  meta(meta: {}): NodeTypeBuilder {
    this.json.meta = meta
    return this
  }

  build(): NodeType {
    return NodeType.fromJSON(this.json)
  }
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
  private constructor (uuid: string, data: {}, meta: {}) {
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

  /**
   * Creates a builder for NodeType.
   * 
   * @param {NodeType} node - Node base
   */
  static builder(node?: NodeType): NodeTypeBuilder {
    return new NodeTypeBuilder(node)
  }
}