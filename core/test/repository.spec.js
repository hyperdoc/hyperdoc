/* global before, it, describe */
'use strict'

const NodeService = require('../dist/services/node').NodeService
const InMemoryNodeStore = require('./store/inmemory/node')

const expect = require('chai').expect

// placeholder for NodeService
let nodeService

before(function () {
  const nodeStore = new InMemoryNodeStore()
  nodeService = new NodeService(nodeStore)
})

describe('Core :: Repository :: NodeService', function () {
  it('create node with valid data', function () {
    const data = {
      test: 'test data'
    }
    const meta = {
      test: 'test meta'
    }

    // create node
    return nodeService.create(null, data, meta).then(node => {
      expect(node.uuid).to.exist
      expect(node.data).to.equal(data)
      expect(node.meta).to.equal(meta)
    })
  })
})
