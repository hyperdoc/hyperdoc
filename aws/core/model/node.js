/**
 * Represents a node in Hyperdoc.
 */
class Node {
  /**
   * Constructor.
   * 
   * @param {string} uuid 
   */
  constructor (uuid) {
    this.uuid = uuid
  }

  /**
   * Convert to JSON.
   */
  toJSON () {
    return {
      uuid: this.uuid
    }
  }

  /**
   * Build a Node instance from a JSON object.
   * 
   * @param {Object} json - JSON
   */
  static fromJSON (json) {
    return new Node(json.uuid)
  }
}

module.exports = Node
