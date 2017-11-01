/* global before, after, it, describe */

'use strict'

const AWS = require('aws-sdk-mock')
const uuid = require('uuid')
const LambdaTester = require('lambda-tester')
const Node = require('../../core/model').Node
const expect = require('chai').expect

// placeholders for lambdas that will be initiated after mocking AWS
let GetNode, SaveNode

const MISSING_NODE_UUID = uuid.v1()
const NODE_UUID = uuid.v1()
const NODE = new Node(NODE_UUID)

before(function () {
  AWS.mock('DynamoDB.DocumentClient', 'get', function (params, callback) {
    if (params.Key.uuid === NODE_UUID) {
      callback(null, {Item: JSON.stringify(NODE)})
    } else {
      callback(null, {})
    }
  })

  // initiate lambda after mocking
  const API_NODE = require('../../lambda/api.node')
  GetNode = API_NODE.get
  SaveNode = API_NODE.post
})

after(function () {
  AWS.restore('DynamoDB.DocumentClient')
})

describe('Lambda :: API :: Node', function () {
  this.timeout(1000)

  it('sucessfully create a Node', function () {
    return LambdaTester(SaveNode).event({
      body: {

      }
    })
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
