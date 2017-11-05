'use strict'

import * as AWS from 'aws-sdk'
const documentClient = new AWS.DynamoDB.DocumentClient()

import * as uuid from 'uuid'

/**
 * DynamoDB table.
 */
export class DynamoTable<T> {
  private params: any
  private mapper: Function

  /**
   * Constructor.
   * 
   * @param {any} params - Table parameters
   * @param {Function} mapper - Item mapper
   */
  constructor (params: any, mapper: Function) {
    this.params = params
    this.mapper = mapper
  }

  /**
   * Delete an item.
   * 
   * @param {Object} key - Item key
   * @return {Promise<T>} A promise that returns an empty object
   */
  delete (key): Promise<T> {
    // delete item and wrap response in a promise
    return new Promise((resolve, reject) => {
      documentClient.delete({
        TableName: this.params.tableName,
        Key: key
      }, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(undefined)
        }
      })
    })
  }

  /**
   * Get an item.
   * 
   * @param {Object} key - Item key
   * @return {Promise<T>} A promise that returns the item object, or undefined if not found.
   */
  get (key): Promise<T> {
    const self = this

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
   * @return {Promise<T>} A promise that returns the saved item object.
   */
  put (data): Promise<T> {
    const self = this

    // generate UUID if missing
    data.uuid = data.uuid || uuid.v1()

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
