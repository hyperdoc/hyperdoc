/* global it, describe */
'use strict'

import * as uuid from 'uuid'
import { NodeType } from '../model'
import { expect } from 'chai'
import 'mocha'

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
