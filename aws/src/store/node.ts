'user strict'

import { NodeStore } from 'hyperdoc-core/dist/store'
import { NodeType } from 'hyperdoc-core/dist/model'

import { DynamoTable } from './table'

/**
 * Storage for nodes based on AWS's DynamoDB.
 */
export class AWSNodeStore implements NodeStore {
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
    return this.nodeTable.put(node)
  }
}
