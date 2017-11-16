/* global before, after, it, describe */

'use strict'

import * as AWS from 'aws-sdk-mock'
import * as UUID from 'uuid'
import * as LambdaTester from 'lambda-tester'
import { expect } from 'chai'
import 'mocha'

import { NodeType } from 'hyperdoc-core/dist/model'
const API_NODE = require('../../../lambda/api/node')

// placeholders for lambdas that will be initiated after mocking AWS
let GetNode, SaveNode

const MISSING_NODE_UUID: string = UUID.v4()
const NODE_UUID: string = UUID.v4()
const NODE: NodeType = NodeType
  .builder()
  .uuid(NODE_UUID)
  .data({})
  .meta({})
  .build()

describe('Lambda :: API :: Node', function () {
  before(function () {
    AWS.mock('DynamoDB.DocumentClient', 'get', function (params, callback) {
      if (params.Key.uuid === NODE_UUID) {
        callback(null, {Item: JSON.stringify(NODE)})
      } else {
        callback(null, {})
      }
    })
  
    // initiate lambda after mocking
    GetNode = API_NODE.get
    SaveNode = API_NODE.post
  })
  
  after(function () {
    AWS.restore('DynamoDB.DocumentClient')
  })

  it('return 404 if UUID does not exist', function () {
    return LambdaTester(GetNode).event({
      pathParameters: {
        uuid: MISSING_NODE_UUID
      }
    }).expectResult((response) => {
      expect(response.statusCode).to.exist
      expect(response.statusCode).to.equal(404)
    })
  })

  it('return 200 if UUID does exist', function () {
    return LambdaTester(GetNode).event({
      pathParameters: {
        uuid: NODE_UUID
      }
    }).expectResult((response) => {
      expect(response.statusCode).to.exist
      expect(response.statusCode).to.equal(200)
    })
  })
})
