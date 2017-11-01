const NodeService = require('./node')

/**
 * Hyperdoc repository.
 */
class HyperdocRepository {
  /**
   * Constructor.
   * 
   * @param {HyperdocContext} context - Hyperdoc context 
   */
  constructor (context) {
    // init services
    this.Node = new NodeService(context)
  }
}

/**
 * Initialise Hyperdoc repository.
 * 
 * @param {HyperdocContext} context - Hyperdoc context
 */
function initRepository (context) {
  return new HyperdocRepository(context)
}

module.exports = initRepository
