'use strict'

import { NodeStore } from '../../../store'
import { NodeType } from '../../../model'

import * as _ from 'underscore'
import * as uuid from 'uuid'

export class InMemoryNodeStore implements NodeStore {
  private nodes: NodeType[]

  constructor () {
    this.nodes = []
  }

  delete (uuid: string): Promise<NodeType> {
    const self = this

    return new Promise((resolve, reject) => {
      // remove node
      self.nodes = _.filter(self.nodes, node => {
        return node.uuid !== uuid
      })

      resolve(null)
    })
  }

  get (uuid: string): Promise<NodeType> {
    const self = this

    return new Promise((resolve, reject) => {
      // find existing node with same UUID
      const node = _.find(self.nodes, node => {
        return node.uuid === uuid
      })

      resolve(node)
    })
  }

  put (node: NodeType): Promise<NodeType> {
    const self = this

    // node must be an instance of Node class
    if (!(node instanceof NodeType)) {
      return Promise.reject(new Error('node parameter is not an instance of Node'))
    }

    // set UUID if missing
    node.uuid = node.uuid || uuid.v1()

    return new Promise((resolve, reject) => {
      // remove existing node with same UUID
      self.nodes = _.filter(self.nodes, node => {
        return node.uuid !== uuid
      })

      // push node to the array
      self.nodes.push(node)

      // return saved node
      resolve(node)
    })
  }
}
