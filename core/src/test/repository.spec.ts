/* global before, it, describe */
'use strict'

import { Session } from '../repository'
import { NodeService } from '../service'
import { InMemoryNodeStore } from './store/inmemory/node'

import { expect } from 'chai'
import 'mocha'

// placeholder for NodeService
let nodeService

before(function () {
  const nodeStore = new InMemoryNodeStore()
  nodeService = new NodeService(nodeStore)
})

describe('Core :: Repository :: NodeService', function () {
  it('create node with valid data', function () {
    const session = new Session('test')
    const data = {
      test: 'test data'
    }
    const meta = {
      test: 'test meta'
    }

    // create node
    return nodeService.create(session, data, meta).then(node => {
      expect(node.hrn).to.exist
      expect(node.data).to.equal(data)
      expect(node.meta).to.equal(meta)
    })
  })
})
