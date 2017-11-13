/* global it, describe */
'use strict'

import { NodeHRN, NodeType } from '../model'

import { expect } from 'chai'
import 'mocha'

describe('Core :: Model', function () {
  it('convert Node class to and from JSON object', function () {
    const hrn = NodeHRN.generate()
    // create node
    const node = new NodeType(
      hrn, {
        test: 'test data'
      }, {
        test: 'test meta'
      })

    // convert to and from JSON object
    const nodeJson = node.toJSON()
    const node2 = NodeType.fromJSON(nodeJson)

    expect(node.hrn).to.exist
    expect(node2.hrn).to.exist
    expect(node.hrn.namespace).to.equal(node2.hrn.namespace)
    expect(node.hrn.uuid).to.equal(node2.hrn.uuid)
    expect(node.data).to.equal(node2.data)
    expect(node.meta).to.equal(node2.meta)
  })
})
