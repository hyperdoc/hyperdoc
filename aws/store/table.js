'use strict'

let AWS = require('aws-sdk')
var uuid = require('uuid')
var documentClient = new AWS.DynamoDB.DocumentClient()

/**
 * DynamoDB table.
 */
class DynamoTable {
  /**
   * Constructor.
   * 
   * @param {Object} params - Table parameters
   * @param {Function} mapper - Item mapper
   */
  constructor (params, mapper) {
    this.params = params
    this.mapper = mapper
  }

  /**
   * Delete an item.
   * 
   * @param {Object} key - Item key
   * @return {Promise<Object>} A promise that returns an empty object
   */
  delete (key) {
    // delete item and wrap response in a promise
    return new Promise((resolve, reject) => {
      documentClient.delete({
        TableName: this.params.tableName,
        Key: key
      }, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve({})
        }
      })
    })
  }

  /**
   * Get an item.
   * 
   * @param {Object} key - Item key
   * @return {Promise<Object>} A promise that returns the item object, or undefined if not found.
   */
  get (key) {
    let self = this

    // get item and wrap response in a promise
    return new Promise((resolve, reject) => {
      documentClient.get({
        TableName: this.params.tableName,
        Key: key
      }, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(self.mapper && data.Item ? self.mapper(data.Item) : data.Item)
        }
      })
    })
  }

  /**
   * Create, or update, an item.
   * 
   * @param {Object} data - Item data
   * @return {Promise<Object>} A promise that returns the saved item object.
   */
  put (data) {
    let self = this

    // generate UUID if missing
    data.uuid = data.uuid || uuid.v1()

    // timestamps
    if (!data.createTime) {
      data.createTime = new Date().toISOString()
    }
    data.updateTime = new Date().toISOString()

    // put item and wrap response in a promise
    return new Promise((resolve, reject) => {
      documentClient.put({
        TableName: this.params.tableName,
        Item: data
      }, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(self.mapper ? self.mapper(data) : data)
        }
      })
    })
  }
}

module.exports = DynamoTable
