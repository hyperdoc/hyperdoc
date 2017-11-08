/* global it, describe */
'use strict'

import { NodeType } from '../model'
import { StoreRegistry, NodeStore } from '../store'
import { expect } from 'chai'
import 'mocha'

class MyNodeStore implements NodeStore {
  delete(uuid: string): Promise<NodeType> {
    throw new Error("Method not implemented.");
  }
  get(uuid: string): Promise<NodeType> {
    throw new Error("Method not implemented.");
  }
  put(node: NodeType): Promise<NodeType> {
    throw new Error("Method not implemented.");
  }
}

describe('Core :: Store', function () {
  it('Stores must be registered correctly in StoreRegistry', function () {
    const nodeStore = new MyNodeStore()
    const storeRegistry = new StoreRegistry(nodeStore)

    // check injected stores
    expect(storeRegistry.nodeStore).to.equal(nodeStore)
  })
})
