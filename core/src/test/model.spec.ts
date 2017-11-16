/* global it, describe */
'use strict'

import { NodeHRN, NodeType } from '../model'

import * as UUID from 'uuid'
import { expect } from 'chai'
import 'mocha'

describe('Core :: Model', function () {
  it('NodeHRN is generated correctly', function () {
    const uuid = UUID.v4()
    const node = NodeType
      .builder()
      .uuid(uuid)
      .data({})
      .meta({})
      .build()

    expect(node.hrn).to.exist
    expect(node.hrn.id).to.equal(uuid)
  })

  it('convert Node class to and from JSON object', function () {
    const uuid = UUID.v4()
    // create node
    const node = NodeType
    .builder()
    .uuid(uuid)
    .data({
      test: 'test data'
    })
    .meta({
      test: 'test meta'
    })
    .build()

    // convert to and from JSON object
    const node2 = NodeType.fromJSON(node.toJSON())

    expect(node2.uuid).to.exist
    expect(node2.hrn).to.exist
    expect(node2.data).to.exist
    expect(node2.meta).to.exist

    expect(node.uuid).to.equal(node2.uuid)
    expect(node.hrn.toString()).to.equal(node2.hrn.toString())
    expect(node.data).to.equal(node2.data)
    expect(node.meta).to.equal(node2.meta)
  })
})
