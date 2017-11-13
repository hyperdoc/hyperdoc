'use strict'

import HRN from './HRN'

import * as UUID from 'uuid'

/**
 * Hyperdoc Resource Name for nodes.
 */
export default class NodeHRN extends HRN {
  public static readonly NAMESPACE = 'node'

  /**
   * Constructor.
   * 
   * @param uuid string - Node UUID
   */
  constructor (uuid: string) {
    super (NodeHRN.NAMESPACE, uuid)
  }

  /**
   * Generate a random NodeHRN.
   * 
   * @returns Node HRN
   */
  public static generate(): NodeHRN {
    return new NodeHRN(UUID.v4())
  }

  /**
   * Generate a NodeHRN from a HRN string.
   * 
   * @param hrn string - NodeHRN string
   * @returns Node HRN
   */
  public static fromString (hrn: string): NodeHRN {
    // parse HRN string to JSON
    const json = super.parseHrnString (hrn)

    return NodeHRN.fromJson(json)    
  }

  /**
   * Generate a NodeHRN from a JSON object
   * @param json {namespace, uuid} - Node HRN as JSON
   */
  public static fromJson (json: {namespace, uuid}): NodeHRN {
    // check whether the namespace is 'node'
    if (json.namespace !== NodeHRN.NAMESPACE) {
      throw new Error (`Node HRN namespace must be '${NodeHRN.NAMESPACE}'`)
    }

    return new NodeHRN(json.uuid)
  }
}