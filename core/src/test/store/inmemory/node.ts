'use strict'

import { NodeStore } from '../../../store'
import { NodeHRN, NodeType } from '../../../model'

import * as UUID from 'uuid'
import * as _ from 'underscore'

export class InMemoryNodeStore implements NodeStore {
  private nodes: NodeType[]

  constructor () {
    this.nodes = []
  }

  delete (uuid: string): Promise<NodeType> {
    const self = this

    return new Promise((resolve, reject) => {
      // remove node
      self.nodes = _.filter(self.nodes, n => {
        return n.uuid !== uuid
      })

      resolve(null)
    })
  }

  get (uuid: string): Promise<NodeType> {
    const self = this

    return new Promise((resolve, reject) => {
      // find existing node with same UUID
      const node = _.find(self.nodes, n => {
        return n.uuid === uuid
      })

      resolve(node)
    })
  }

  put (node: NodeType): Promise<NodeType> {
    const self = this

    // node must be an instance of Node class
    if (!(node instanceof NodeType)) {
      return Promise.reject(new Error('node parameter is not an instance of NodeType'))
    }

    // set UUID if missing
    if (!node.uuid){
      node = NodeType
        .builder(node)
        .uuid(UUID.v4())
        .build()
    }

    return new Promise((resolve, reject) => {
      // remove existing node with same UUID
      self.nodes = _.filter(self.nodes, n => {
        return node.uuid !== n.uuid
      })

      // push node to the array
      self.nodes.push(node)

      // return saved node
      resolve(node)
    })
  }
}
