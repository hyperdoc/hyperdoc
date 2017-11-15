'use strict'

import HRN, { HRNJson } from './HRN'

import * as UUID from 'uuid'

/**
 * Hyperdoc Resource Name for nodes.
 */
export default class NodeHRN extends HRN {
  public static readonly NAMESPACE = 'node'

  protected static UUID_REGEX = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i

  /**
   * Constructor.
   * 
   * @param {string} uuid - Node UUID
   */
  constructor (uuid: string) {
    // check whether the uuid is well formed
    if (!NodeHRN.UUID_REGEX.test (uuid)) {
      throw new Error ('NodeHRN must be constructed with a valid UUID') 
    }

    super (NodeHRN.NAMESPACE, uuid)
  }

  /**
   * Generate a random NodeHRN.
   * 
   * @returns {NodeHRN} Node HRN
   */
  public static generate(): NodeHRN {
    return new NodeHRN(UUID.v4())
  }

  /**
   * Generate a NodeHRN from a HRN string.
   * 
   * @param {string} hrn - NodeHRN string
   * @returns {NodeHRN} Node HRN
   */
  public static fromString (hrn: string): NodeHRN {
    // parse HRN string to JSON
    const json = super.parseHrnString (hrn)

    return NodeHRN.fromJson(json)    
  }

  /**
   * Generate a NodeHRN from a JSON object.
   * 
   * @param HRNJson json - Node HRN as JSON
   */
  public static fromJson (json: HRNJson): NodeHRN {
    // check whether the namespace is 'node'
    if (json.namespace !== NodeHRN.NAMESPACE) {
      throw new Error (`Node HRN namespace must be '${NodeHRN.NAMESPACE}'`)
    }

    return new NodeHRN(json.id)
  }
}