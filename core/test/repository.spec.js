/* global before, it, describe */
'use strict'

const NodeService = require('../repository/node')
const InMemoryNodeStore = require('./store/inmemory/node')

const expect = require('chai').expect

// placeholder for NodeService
let nodeService

before(function () {
  const nodeStore = new InMemoryNodeStore()
  nodeService = new NodeService(nodeStore)
})

describe('Core :: Repository :: NodeService', function () {
  it('nodeStore passed by parameter must be an instance of NodeStore', function () {
    expect(function () {
      const service = new NodeService({})
    }).to.throw("Node store must be an instance of 'NodeStore'")
  })

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
