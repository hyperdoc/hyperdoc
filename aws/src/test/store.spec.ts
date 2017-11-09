'use strict'

import * as AWS from 'aws-sdk-mock'
import * as uuid from 'uuid'
import { expect } from 'chai'
import * as _ from 'underscore'

import DynamoTable from '../store/DynamoTable'

class TestType {
  public uuid: string
  public data: string

  constructor(uuid: string, data: string) {
    this.uuid = uuid
    this.data = data
  }

  toJSON () {
    return {
      uuid: this.uuid,
      data: this.data
    }
  }

  static fromJSON (json) {
    return new TestType(json.uuid, json.data)
  }
}

// placeholder for test DynamoTable
let TestTable: DynamoTable<TestType>

describe('Lambda :: Store :: DynamoTable', function() {
  before(function () {
    let items = []

    AWS.mock('DynamoDB.DocumentClient', 'get', function (params, callback) {
      const item = _.find(items, i => {
        return i.uuid === params.Key.uuid
      })

      callback(null, item ? {Item: item} : {})
    })

    AWS.mock('DynamoDB.DocumentClient', 'put', function (params, callback) {
      const item = params.Item

      // remove existing node with same UUID
      items = _.filter(items, i => {
        return i.uuid !== item.uuid
      })

      // push node to the array
      items.push(item)

      // return saved node
      callback(null, {Item: item})
    })

    AWS.mock('DynamoDB.DocumentClient', 'delete', function (params, callback) {
      // remove existing node with same UUID
      items = _.filter(items, i => {
        return i.uuid !== params.Key.uuid
      })

      callback(null, {})
    })
  
    TestTable = new DynamoTable<TestType>({tableName: 'test'}, TestType.fromJSON)
  })
  
  after(function () {
    AWS.restore('DynamoDB.DocumentClient')
  })

  it('missing item must not exist', function () {
    return TestTable.get({uuid: uuid.v1()}).then(response => {
      expect(response).to.not.exist
    })
  })

  it('read an existing item', function () {
    const item = new TestType(uuid.v1(), 'test')

    return TestTable.put(item.toJSON()).then(response => {
      expect(item.uuid).to.equal(response.uuid)
      expect(item.data).to.equal(response.data)

      return TestTable.get({uuid: item.uuid}).then(r => {
        expect(item.uuid).to.equal(r.uuid)
        expect(item.data).to.equal(r.data)
      })
    })
  })

  it('delete an existing item', function () {
    const item = new TestType(uuid.v1(), 'test')

    return TestTable.put(item.toJSON()).then(response => {
      expect(item.uuid).to.equal(response.uuid)
      expect(item.data).to.equal(response.data)

      return TestTable.delete({uuid: item.uuid}).then(r => {
        expect(r).to.not.exist
        
        return TestTable.get({uuid: item.uuid}).then(r2 => {
          expect(r2).to.not.exist
        })
      })
    })
  })
})