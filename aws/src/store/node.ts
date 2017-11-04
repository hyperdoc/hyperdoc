'user strict'

import { Store, Model } from 'hyperdoc-core'
const NodeStore = Store.NodeStore
const Node = Model.Node

import { DynamoTable } from './table'

/**
 * Storage for nodes based on AWS's DynamoDB.
 */
export class AWSNodeStore extends NodeStore {
  private nodeTable: DynamoTable

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

  get (uuid: string) {
    return this.nodeTable.get({uuid: uuid})
  }

  delete (uuid: string) {
    return this.nodeTable.delete({uuid: uuid})
  }

  put (node: Node) {
    return this.nodeTable.put(node)
  }
}
