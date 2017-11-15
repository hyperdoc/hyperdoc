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
  private _hrn: NodeHRN
  private _uuid: string
  private _data: {}
  private _meta: {}

  /**
   * Constructor.
   *
   * @param {string} uuid - Node UUID
   * @param {any} data - Node data
   * @param {any} meta - Node metadata
   */
  constructor (uuid: string, data: {}, meta: {}) {
    this._uuid = uuid
    this._hrn = uuid ? new NodeHRN(uuid) : undefined
    this._data = data || {}
    this._meta = meta || {}
  }

  /**
   * Get node HRN.
   * 
   * @return {NodeHRN} Node HRN
   */
  get hrn(): NodeHRN {
    return this._hrn
  }

  /**
   * Get node UUID.
   * 
   * @return {string} Node UUID
   */
  get uuid(): string {
    return this._uuid
  }

  /**
   * Get node data.
   * 
   * @return {} Node data
   */
  get data(): {} {
    return this._data
  }

  /**
   * Get node metadata.
   * 
   * @return {} Node metadata
   */
  get meta(): {} {
    return this._meta
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