'use strict'

/**
 * Hyperdoc Resource Name. It is a URI schema to uniquely identify resources
 * in Hyperdoc. A HRN has the following structure:
 * 
 * hyperdoc:$NAMESPACE:$UUID
 * 
 * To safetely assign an HRN to a resource, each type defines its own HRN class.
 * So, for example, a node HRN cannot be assigned to a user HRN.
 */
export default abstract class HRN {
  public static readonly SCHEME = 'hyperdoc'

  // regular expressions to validate the HRN is well formed
  protected static NAMESPACE_REGEX = /^\w+$/i
  protected static UUID_REGEX = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i
  protected static HRN_REGEX = /^hyperdoc:(\w+):([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i

  // HRN properties
  readonly namespace: string
  readonly uuid: string

  /**
   * Constructor.
   * 
   * @param namespace: string - Namespace
   * @param uuid : string - UUID
   */
  protected constructor (namespace: string, uuid: string) {
    // check whether the namespace is well formed
    if (!HRN.NAMESPACE_REGEX.test (namespace)) {
      throw new Error ('HRN must be constructed with a valid namespace')
    }

    // check whether the uuid is well formed
    if (!HRN.UUID_REGEX.test (uuid)) {
      throw new Error ('HRN must be constructed with a valid UUID') 
    }

    this.namespace = namespace
    this.uuid = uuid
  }

  /**
   * String representation of a HRN.
   * 
   * @returns String representing a HRN
   */
  public toString (): string {
    return `${HRN.SCHEME}:${this.namespace}:${this.uuid}`
  }

  /**
   * JSON representation of a HRN.
   * 
   * @returns JSON representing a HRN
   */
  public toJson (): {namespace, uuid} {
    return {
      namespace: this.namespace,
      uuid: this.uuid
    }
  }

  /**
   * Parse a HRN string.
   * 
   * @param hrn string - HRN
   * @returns JSON representing a HRN
   */
  protected static parseHrnString (hrn: string): {namespace, uuid} {
    // check whether the HRN is well formed
    if (!HRN.HRN_REGEX.test (hrn)) {
      throw new Error ('HRN is malformed')
    }

    // extract values
    const m = hrn.match (HRN.HRN_REGEX)

    // return JSON representation
    return {
      namespace: m[1],
      uuid: m[2]
    }
  }
}