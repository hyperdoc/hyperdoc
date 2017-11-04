'user strict'

const Hyperdoc = require('hyperdoc-core')
const NodeStore = Hyperdoc.Store.Node
const Node = Hyperdoc.Model.Node

const DynamoTable = require('./table')

/**
 * Storage for nodes based on AWS's DynamoDB.
 */
class AWSNodeStore extends NodeStore {
  /**
   * Constructor.
   *
   * @param {Object} config - Configuration
   */
  constructor (config) {
    super()

    // get parameters of nodes table
    const tableParams = config.tables.node

    // init nodes table
    this.nodeTable = new DynamoTable(tableParams, Node.fromJSON)
  }

  get (uuid) {
    return this.nodeTable.get({uuid: uuid})
  }

  delete (uuid) {
    return this.nodeTable.delete({uuid: uuid})
  }

  put (node) {
    return this.nodeTable.put(node)
  }
}

module.exports = AWSNodeStore
