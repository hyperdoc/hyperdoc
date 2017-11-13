'user strict'

import { NodeStore } from 'hyperdoc-core/dist/store'
import { NodeType } from 'hyperdoc-core/dist/model'

import DynamoTable from './DynamoTable'

/**
 * Storage for nodes based on AWS's DynamoDB.
 */
export default class AWSNodeStore implements NodeStore {
  private nodeTable: DynamoTable<NodeType>

  /**
   * Constructor.
   *
   * @param {Object} config - Configuration
   */
  constructor (config) {
    // get parameters of nodes table
    const tableParams = config.tables.node

    // init nodes table
    this.nodeTable = new DynamoTable<NodeType>(tableParams, NodeType.fromJSON)
  }

  get (uuid: string): Promise<NodeType> {
    return this.nodeTable.get({uuid: uuid})
  }

  delete (uuid: string): Promise<NodeType> {
    return this.nodeTable.delete({uuid: uuid})
  }

  put (node: NodeType): Promise<NodeType> {
    const data = node.toJSON()

    // set the key
    data.uuid = node.hrn.uuid
    
    return this.nodeTable.put(data)
  }
}
