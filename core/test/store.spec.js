/* global it, describe */
'use strict'

const NodeStore = require('../store/node')
const StoreRegistry = require('../store/registry')

const expect = require('chai').expect

describe('Core :: Store', function () {
  it('Stores must be registerd correctly in StoreRegistry', function () {
    const nodeStore = new NodeStore()
    const storeRegistry = new StoreRegistry(nodeStore)

    // check injected stores
    expect(storeRegistry.getNodeStore()).to.equal(nodeStore)
  })
})
