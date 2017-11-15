'use strict'

/**
 * HRN JSON structure.
 */
export interface HRNJson {
  namespace: string
  id: string
}

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
  protected static ID_REGEX = /^(.*)$/i
  protected static HRN_REGEX = /^hyperdoc:(\w+):([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i

  // HRN properties
  private _namespace: string
  private _id: string

  /**
   * Constructor.
   * 
   * @param {string} namespace - Namespace
   * @param {string} id - UUID
   */
  protected constructor (namespace: string, id: string) {
    // check whether the namespace is well formed
    if (!HRN.NAMESPACE_REGEX.test (namespace)) {
      throw new Error ('HRN must be constructed with a valid namespace')
    }

    // check whether the uuid is well formed
    if (!HRN.ID_REGEX.test (id)) {
      throw new Error ('HRN must be constructed with a valid UUID') 
    }

    this._namespace = namespace
    this._id = id
  }

  /**
   * Get HRN namespace.
   * 
   * @returns {string} HRN namespace
   */
  get namespace(): string {
    return this._namespace
  }

  /**
   * Get HRN id.
   * 
   * @returns {string} HRN id
   */
  get id(): string {
    return this._id
  }

  /**
   * String representation of a HRN.
   * 
   * @returns {string} String representing a HRN
   */
  public toString (): string {
    return `${HRN.SCHEME}:${this.namespace}:${this.id}`
  }

  /**
   * JSON representation of a HRN.
   * 
   * @returns {HRNJson} JSON representing a HRN
   */
  public toJson (): HRNJson {
    return {
      namespace: this.namespace,
      id: this.id
    }
  }

  /**
   * Parse a HRN string.
   * 
   * @param {string} hrn - HRN
   * @returns {HRNJson} JSON representing a HRN
   */
  protected static parseHrnString (hrn: string): HRNJson {
    // check whether the HRN is well formed
    if (!HRN.HRN_REGEX.test (hrn)) {
      throw new Error ('HRN is malformed')
    }

    // extract values
    const m = hrn.match (HRN.HRN_REGEX)

    // return JSON representation
    return {
      namespace: m[1],
      id: m[2]
    }
  }
}