/* global it, describe */
'use strict'

const uuid = require('uuid')
const NodeType = require('../dist/model').NodeType
const expect = require('chai').expect

describe('Core :: Model', function () {
  it('convert Node class to and from JSON object', function () {
    // create node
    const node = new NodeType(
      uuid.v1(), {
        test: 'test data'
      }, {
        test: 'test meta'
      })

    // convert to and from JSON object
    const nodeJson = node.toJSON()
    const node2 = NodeType.fromJSON(nodeJson)

    expect(node.uuid).to.equal(node2.uuid)
    expect(node.data).to.equal(node2.data)
    expect(node.meta).to.equal(node2.meta)
  })
})
