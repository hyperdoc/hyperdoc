'use strict'

const NodeStore = require('../../../store/node')
const Node = require('../../../model/node')

const _ = require('underscore')
const uuid = require('uuid')

class InMemoryNodeStore extends NodeStore {
  constructor () {
    super()
    this.nodes = []
  }

  delete (uuid) {
    const self = this

    return new Promise((resolve, reject) => {
      // remove node
      self.nodes = _.filter(self.nodes, node => {
        return node.uuid !== uuid
      })

      resolve({})
    })
  }

  get (uuid) {
    const self = this

    return new Promise((resolve, reject) => {
      // find existing node with same UUID
      const node = _.find(self.nodes, node => {
        return node.uuid === uuid
      })

      resolve(node)
    })
  }

  put (node) {
    const self = this

    // node must be an instance of Node class
    if (!(node instanceof Node)) {
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

module.exports = InMemoryNodeStore
