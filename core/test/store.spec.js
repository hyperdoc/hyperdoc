/* global it, describe */
'use strict'

const NodeStore = require('../dist/store').NodeStore
const StoreRegistry = require('../dist/store').StoreRegistry

const expect = require('chai').expect

describe('Core :: Store', function () {
  it('Stores must be registered correctly in StoreRegistry', function () {
    const nodeStore = new NodeStore()
    const storeRegistry = new StoreRegistry(nodeStore)

    // check injected stores
    expect(storeRegistry.nodeStore).to.equal(nodeStore)
  })
})
